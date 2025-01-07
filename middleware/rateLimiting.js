const {rateLimit} = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 60000, // 1 minute (60 * 1000)
    limit: 100,
    statusCode: 429,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests from this IP, please try again after a minute.",
    handler: (req, res) => {
        res.status(429).json({message: "Too many requests from this IP, please try again after a minute."});
        throw new Error("Too many requests from this IP, please try again after a minute.");
    },
    keyGenerator: (req) => {
        return req.ip;
    }
});

module.exports = {limiter}