const jwt = require("jsonwebtoken");


const generateToken = (payload, isRefresh) => {
    if(isRefresh){
        return jwt.sign(payload, process.env.TOKEN_SECRET_REFRESH, {expiresIn: "5min",});
    } 

    return jwt.sign(payload, process.env.TOKEN_SECRET_REFRESH, {expiresIn: "1min",})
}

module.exports = { generateToken };