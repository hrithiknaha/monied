const errorHandler = (err, req, res, next) => {
    console.log({ statusCode: res.statusCode, stack: err.stack });

    const status = res.statusCode ? res.statusCode : 500; // server error

    res.status(status).json({ message: err.message });
};

module.exports = errorHandler;
