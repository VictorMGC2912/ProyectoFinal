const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.header("auth-token");

    if(!token) return res.status(401).send("No tienes acceso");

    try{
        const payload = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = payload; //COGEMOS LA INFO DEL FRONTEND y LE PASAMOS LA INFORMACION DEL PAYLOAD
        next();

    }catch(error) {
        try{
            const payload = jwt.verify(token, process.env.TOKEN_SECRET_REFRESH);
            req.user = payload; //COGEMOS LA INFO DEL FRONTEND y LE PASAMOS LA INFORMACION DEL PAYLOAD
            next();
        }catch(error){
            res.status(400).send("Expired Token")
        }
        
    }
};

module.exports = { verifyToken };