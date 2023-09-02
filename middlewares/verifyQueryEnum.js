const verifyQueryEnum = async (req, res, next) => {
    try {
        if (req.query?.type) {
            const { type } = req.query;

            if (type === "BANK" || type === "CREDIT_CARD") next();
            else throw new Error("Provide valid query params");
        } else next();
    } catch (error) {
        res.statusCode = 400;
        next(error);
    }
};

module.exports = verifyQueryEnum;
