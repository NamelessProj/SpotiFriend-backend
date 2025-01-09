const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: (origin, callback) => {
        if(allowedOrigins.includes(origin) || (process.env.NODE_ENV === 'dev' && !origin)){
            callback(null, true);
        }else{
            callback(new Error("Origins not allowed by CORS."));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions;