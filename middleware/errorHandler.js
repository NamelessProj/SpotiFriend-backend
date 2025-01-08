const errorHandler = (err, req, res) => {
    res.send({
        message: err.message,
        stack: process.env.NODE_ENV === 'prod' ? null : err.stack,
    });
}

module.exports = {errorHandler}