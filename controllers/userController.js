const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const {generateToken} = require('../utils/generateToken');

// @desc   Login a user
// @route  POST /api/user/login
// @access Public
const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    // Check if the fields are filled
    if(!email || !password || email === '' || password === ''){
        res.status(401);
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
        res.status(401);
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
        res.status(400);
        throw new Error("Please fill all the required fields");
    }

    // Checking if a user with this email exist, if yes sending an error
    const emailExists = await User.findOne({email});
    if(emailExists){
        res.status(400);
        throw new Error("This email is already in use.");
    }

    // Checking if a user with this username exist, if yes sending an error
    const usernameExists = await User.findOne({username});
    if(usernameExists){
        res.status(400);
        throw new Error("This username is already taken.");
    }

    // Checks if the username is not too long or too short
    if(username.length < 3){
        res.status(400);
        throw new Error("The username must be at least 3 characters.");
    }
    if(username.length > 20){
        res.status(400);
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
        res.status(400);
        throw new Error("An error occur while attempting to create the user. Please retry later.");
    }
});

module.exports = {
    login,
    register
}