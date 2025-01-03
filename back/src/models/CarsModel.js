const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carsSchema = new Schema({
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    anio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    foto: {
        type: String,
        required: true
    },
    fav: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencia al modelo de usuario
      }],
});

const car = mongoose.model("Car", carsSchema, "Car");

module.exports = car;