const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const carsRouter = require('./routes/carsRoutes');
const userRouter = require("./routes/userRoutes");
const port = 9000;

//Así inicializamos express y podemos acceder a todas las funcionalidades que nos proporciona
const app = express();
//Así inicializamos express y podemos acceder a todas las funcionalidades que nos proporciona
app.use(express.json());
// Esto nos permite obtener la información de configuración de ".env"
require("dotenv").config();

app.use(cors({
    origin: 'http://10.5.0.2:3000', // La URL de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
  }));
//   

//CONEXION CON MONGO
const url_mongo = process.env.DATABASE_URL_DEV
mongoose.connect(url_mongo);

const db = mongoose.connection;

db.on("error", (error) => {
    console.log(`Error al conectar con mongo ${error}`)
});
db.on("connected", () => {
    console.log(`Succecss connect`)
});
db.on("disconected", () => {
    console.log(`Mongo is disconected`)
});


//RUTAS
app.use("/cars", carsRouter);
app.use("/user", userRouter);


//ESCUCHA DEL PUERTO
app.listen(port, () => {
    console.log(`APP listening on port ${port}`);
});