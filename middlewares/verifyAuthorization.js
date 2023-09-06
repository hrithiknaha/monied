const verifyAuthorization = async (req, res, next) => {
    try {
        const loggedInUsername = req.user;
        const requestedUsername = req.params.username;

        if (loggedInUsername === requestedUsername) next();
        else throw new Error("Request Unauthorized");
    } catch (error) {
        res.statusCode = 403;
        next(error);
    }
};

module.exports = verifyAuthorization;
