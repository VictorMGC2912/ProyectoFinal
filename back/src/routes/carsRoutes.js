const { loadData, getCars, getCarById, createCar, updateCar, deleteCar, getFavCarByUserId, deleteCarToFav, addCarToFav } = require('../controllers/carsController');
const { verifyToken } = require('../middleware/auth');



const carsRouter = require('express').Router();

//SOLO SE UTILIZA PARA CARGA INICIAL EN MONGO
//carsRouter.get('/loadData', loadData);
carsRouter.get('/', getCars);
carsRouter.get('/:userId/getFavCarByUserId', verifyToken, getFavCarByUserId);
carsRouter.post('/', createCar);
carsRouter.patch('/:carId/addCarToFav',verifyToken, addCarToFav);
carsRouter.delete('/:carId/deleteCarToFav', verifyToken, deleteCarToFav);
carsRouter.get('/:id', getCarById);
carsRouter.put('/:id', updateCar);
carsRouter.delete('/:carId', deleteCar);


module.exports = carsRouter;