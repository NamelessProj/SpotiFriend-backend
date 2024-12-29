const jwt = require('jsonwebtoken');
const asyncHandler  = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded._id);
            next();
        }catch(error){
            console.log(error);
            res.status(401);
            throw new Error('Not authorized, token error.');
        }
    }else{
        res.status(401);
        throw new Error('Not authorized, no token.');
    }
})

const adminProtect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findOne({_id: decoded._id, role: 'admin'});
            next();
        }catch(error){
            console.log(error);
            res.status(401);
            throw new Error('Not authorized, token error.');
        }
    }else{
        res.status(401);
        throw new Error('Not authorized, no token.');
    }
});

module.exports = {protect,adminProtect};