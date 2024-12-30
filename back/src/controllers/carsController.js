const carsDB = require("../mocks/carsDB");
const carModel = require("../models/CarsModel");


//CARGA INICIAL EN MONGO
const loadData = async (req, res) => {
    try{
        carsDB.map(async (car) => {
            const newCar = carModel({
                marca: car.marca,
                modelo: car.modelo,
                anio: car.anio,
                descripcion: car.descripcion,
                precio: car.precio,
                foto: car.foto
            })
            await newCar.save()
        })
        res.sendStatus(200)
    }catch(error){
        console.log(error)
    }
}


module.exports = {
    loadData
}