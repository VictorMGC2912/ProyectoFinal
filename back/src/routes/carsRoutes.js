const { loadData } = require('../controllers/carsController');



const carsRouter = require('express').Router();

//SOLO SE UTILIZA PARA CARGA INICIAL EN MONGO
carsRouter.get('loadData', loadData);


module.exports = carsRouter;