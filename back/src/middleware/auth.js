const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    // Obtener el token del header Authorization
    const authHeader = req.header("Authorization"); // Cambiado a Authorization
    const token = authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1] // Extraer el token sin 'Bearer'
        : null;

    if (!token) return res.status(401).send("No tienes acceso");

    try {
        // Verificar el token principal
        const payload = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = payload; // Guardar el payload en req.user
        next();
    } catch (error) {
        try {
            // Verificar el token de refresco en caso de error
            const payload = jwt.verify(token, process.env.TOKEN_SECRET_REFRESH);
            req.user = payload; // Guardar el payload en req.user
            next();
        } catch (error) {
            res.status(400).send("Expired Token");
        }
    }
};

module.exports = { verifyToken };
