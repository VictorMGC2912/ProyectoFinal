const { loadData, getCars, getCarById, createCar, updateCar, deleteCar } = require('../controllers/carsController');



const carsRouter = require('express').Router();

//SOLO SE UTILIZA PARA CARGA INICIAL EN MONGO
//carsRouter.get('/loadData', loadData);
carsRouter.get('/', getCars);
carsRouter.post('/', createCar);
carsRouter.get('/:id', getCarById);
carsRouter.put('/:id', updateCar);
carsRouter.delete('/:id', deleteCar);


module.exports = carsRouter;