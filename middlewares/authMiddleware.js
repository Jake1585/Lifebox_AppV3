const jwt = require("jsonwebtoken");


module.exports = async(req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    
            if(err)
            {
                return res.status(401).send({
                    message: "Authentication token failed",
                    success: false
                });
            }else{
                req.body.userId = decoded.id;
                next();
            }
        });
    } catch (error) {
        return res.status(401).send({
            message: "Authentication token failed",
            success: false
        });      
    }
};