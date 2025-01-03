const { loadData, getCars, getCarById, createCar, updateCar, deleteCar, getFavCarByUserId } = require('../controllers/carsController');
const { verifyToken } = require('../middleware/auth');



const carsRouter = require('express').Router();

//SOLO SE UTILIZA PARA CARGA INICIAL EN MONGO
//carsRouter.get('/loadData', loadData);
carsRouter.get('/', getCars);
carsRouter.get('/getFavCarByUserId', verifyToken, getFavCarByUserId);
carsRouter.post('/', createCar);
carsRouter.get('/:id', getCarById);
carsRouter.put('/:id', updateCar);
carsRouter.delete('/:id', deleteCar);


module.exports = carsRouter;