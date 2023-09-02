const verifyQueryEnum = async (req, res, next) => {
    try {
        const { type } = req.query;

        if (type === "BANK" || type === "CREDIT_CARD") next();
        else throw new Error("Provide valid query params");
    } catch (error) {
        next(error);
    }
};

module.exports = verifyQueryEnum;
