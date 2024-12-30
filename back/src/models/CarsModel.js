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
        type: URL,
        required: true
    }
});

const car = mongoose.model("Car", carsSchema, "Car");

module.exports = car;