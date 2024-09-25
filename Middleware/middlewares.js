const { verifyToken } = require("../Utils/loger");



const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).send("Access denied");

    try {
        const decoded = verifyToken(token, process.env.SecretKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send("Invalid token");
    }
};

module.exports = auth;
