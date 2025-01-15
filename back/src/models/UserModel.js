const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Correo incorrecto"]
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    fav: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car', // Referencia al modelo de usuario
      }],
    createdAt: {
        type: Date,
        default: Date.now // Asigna la fecha actual como valor por defecto
    }
});

const User = mongoose.model("User", userSchema, "User");

module.exports = User;