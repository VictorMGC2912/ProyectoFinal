const crypto = require("crypto");

const secret = "token mega secreto de la app";

const hash = crypto.createHmac("sha256", secret).update("Soy otro campo secreto").digest("hex");

console.log(hash);