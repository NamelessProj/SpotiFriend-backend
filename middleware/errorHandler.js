const errorHandler = (err, req, res) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.send({
        message: err.message,
        stack: process.env.NODE_ENV === 'prod' ? null : err.stack,
    });
}

module.exports = {errorHandler}