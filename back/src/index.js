const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const carsRouter = require('./routes/carsRoutes');
const userRouter = require("./routes/userRoutes");


const app = express();
const port = 9000;

//CONEXION CON MONGO
const url_mongo = 'mongodb+srv://victor8913:Q76N1C5v3BDGtwKK@cluster0.5fe8c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

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

app.use(express.json());
app.use(cors());

//RUTAS
app.use("/cars", carsRouter);
app.use("/user", userRouter);


//ESCUCHA DEL PUERTO
app.listen(port, () => {
    console.log(`APP listening on port ${port}`);
});