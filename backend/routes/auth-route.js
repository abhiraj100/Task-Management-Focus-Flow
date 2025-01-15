const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.header("authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if(token == null){
        return res.status(401).json({message: "Authentication token required"});
    }

    jwt.verify(token, "abhiY", (err, user) => {
        if(err) {
            return res.status(200).json(err);
        }
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };