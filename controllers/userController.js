const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Room = require('../models/roomModel');
const {generateToken} = require('../utils/generateToken');

// @desc   Login a user
// @route  POST /api/user/login
// @access Public
const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    // Check if the fields are filled
    if(!email || !password || email === '' || password === ''){
        res.status(401).json({message: "Please fill all fields"});
        throw new Error("Please fill all fields");
    }

    // Getting the user
    const user = await User.findOne({ email }).select('+password');

    // Check if the user exist and if the password is correct
    if(user && await user.matchPassword(password)){
        // Removing the password from the user's information
        const returnUser = Object.fromEntries(Object.entries(user._doc).filter(([key]) => key !== 'password'));

        // Generate a token for the user and sending the user's information
        generateToken(res, user._id);
        res.status(201).json({user: returnUser});
    }else{
        // Sending an error
        res.status(401).json({message: "A problem occur with your password or email."});
        throw new Error("A problem occur with your password or email.");
    }
});

// @desc   Register a new user
// @route  POST /api/user/register
// @access Public
const register = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;

    // Check if the fields are filled
    if(!username || !email || !password || username === '' || email === '' || password === ''){
        res.status(400).json({message: "Please fill all the required fields"});
        throw new Error("Please fill all the required fields");
    }

    // Checking if a user with this email exist, if yes sending an error
    const emailExists = await User.findOne({email});
    if(emailExists){
        res.status(400).json({message: "This email is already in use."});
        throw new Error("This email is already in use.");
    }

    // Checking if a user with this username exist, if yes sending an error
    const usernameExists = await User.findOne({username});
    if(usernameExists){
        res.status(400).json({message: "This username is already taken."});
        throw new Error("This username is already taken.");
    }

    // Checks if the username is not too long or too short
    if(username.length < 3){
        res.status(400).json({message: "The username must be at least 3 characters."});
        throw new Error("The username must be at least 3 characters.");
    }
    if(username.length > 20){
        res.status(400).json({message: "The username must be under 20 characters."});
        throw new Error("The username must be under 20 characters.");
    }

    // Creating the new user
    const user = await User.create({
        username,
        email,
        password,
    });

    if(user){
        generateToken(res, user._id);

        // Removing the password from the user's information
        const returnUser = Object.fromEntries(Object.entries(user._doc).filter(([key]) => key !== 'password'));
        res.status(201).json({user: returnUser});
    }else{
        res.status(400).json({message: "An error occur while attempting to create the user. Please retry later."});
        throw new Error("An error occur while attempting to create the user. Please retry later.");
    }
});

// @desc   Logout a user
// @route  POST /api/user/logout
// @access Public
const logout = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({message: 'User has been logged out.'});
});

// @desc   Update a user
// @route  PUT /api/user/
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const user = req.user;
    if(!user){
        res.status(401).json({message: "User not found."});
        throw new Error("User not found.");
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    // Checking if a user with this email exist, if yes sending an error
    const emailExists = await User.findOne({
        email: user.email,
        _id: {$ne: user._id}
    });
    if(emailExists){
        res.status(400).json({message: "This email is already in use."});
        throw new Error("This email is already in use.");
    }

    // Checking if a user with this username exist, if yes sending an error
    const usernameExists = await User.findOne({
        username: user.username,
        _id: {$ne: user._id}
    });
    if(usernameExists){
        res.status(400).json({message: "This username is already taken."});
        throw new Error("This username is already taken.");
    }

    // Checks if the username is not too long or too short
    if(user.username.length < 3){
        res.status(400).json({message: "The username must be at least 3 characters."});
        throw new Error("The username must be at least 3 characters.");
    }
    if(user.username.length > 20){
        res.status(400).json({message: "The username must be under 20 characters."});
        throw new Error("The username must be under 20 characters.");
    }

    // Updating the user
    await user.save();

    // Removing the password from the user's information
    const returnUser = Object.fromEntries(Object.entries(user._doc).filter(([key]) => key !== 'password'));

    res.status(200).json({user: returnUser});
});

// @desc   Delete a user
// @route  POST /api/user/delete
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const user = req.user;
    const {password} = req.body;
    
    // Checking if the password is filled
    if(!password || password === ""){
        res.status(401).json({message: `Please fill all fields`});
        throw new Error("Please fill all fields");
    }
    
    // Checking the password
    const currentUser = await User.findById(user._id).select('+password');
    if(currentUser && await currentUser.matchPassword(password)){
        await User.findByIdAndDelete(user._id);
        await Room.deleteMany({owner: user._id});

        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0),
        });
        res.status(200).json({message: `The user has been deleted successfully.`});
    }else{
        res.status(401).json({message: `A problem occur while trying to delete your account, retry later.`});
        throw new Error("A problem occur while trying to delete your account, retry later.");
    }
});

module.exports = {
    login,
    register,
    logout,
    updateUser,
    deleteUser
}