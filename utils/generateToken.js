const jwt = require('jsonwebtoken');

const generateToken = (res, _id) => {
    const token = jwt.sign({_id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.cookie('spoti_jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'dev',
        sameSite: 'strict',
        maxAge: 30*24*60*60*1000
    });
}

module.exports = {generateToken}