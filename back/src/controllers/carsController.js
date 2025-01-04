const carsDB = require("../mocks/carsDB");
const carModel = require("../models/CarsModel");
const userModel = require("../models/UserModel");
const verifyToken = require("../middleware/auth");


//MOSTRAR TODOS LOS COCHES

const getCars = async (req, res) => {
    try{
        const allCars = await carModel.find();
        const resCar = allCars.map(car => {
            return {
                marca: car.marca,
                modelo: car.modelo,
                anio: car.anio,
                descripcion: car.descripcion,
                precio: car.precio,
                foto: car.foto,
                fav: car.fav
            }
        });
        res.status(200).json({
            status: 'succeeded',
            data: resCar,
            error: null
        })
    }catch(error){
        res
        .status(500)
        .json({status: "failed", data: null, error: error.message})
    }
};

const getCarById = async (req, res) => {
    try{
        const id = req.params.id
        const car = await carModel.findById(id)
        console.log(car)
        res.status(200).json({
            status: "succeeded",
            data: car,
            error: null
        })

    }catch(error){
        res
        .status(500)
        .json({status: "failed", data: null, error: error.message})
    }
}

const getFavCarByUserId = async (req, res) => {
    try{
        const userId = req.user.userId;//OBTENEMOS EL ID DEL HEADER QUE VIENE DEL FRONTEND
        const cars = await carModel.find({fav: userId}).populate("fav");//CONSULTAMOS DEL CAMPO FAV SI COINCIDE CON EL ID DEL USUARIO QUE NOS VIENE DEL HEADER
        
        res.status(200).json(cars);
    }catch(error){
        res
        .status(500)
        .json({message: "Error al agregar a favoritos", error: error.message});
    }
}

const createCar = async (req, res) => {
    try{
        const carData = req.body
        const newCar = await carModel({
            marca: carData.marca,
            modelo: carData.modelo,
            anio: carData.anio,
            descripcion: carData.descripcion,
            precio: carData.precio,
            foto: carData.foto,
            fav: carData.fav
        })
        await newCar.save()
        console.log(newCar)
        res.status(200).json({
            status: "succeeded",
            data: newCar,
            error: null
        })
    }catch(error){
        res
        .status(500)
        .json({status: "failed", data: null, error: error.message})
    }
}

const addCarToFav = async (req, res) => {
    try {
      const userId = req.user.userId;
      const carId = req.params.carId;
  
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }
  
      const car = await carModel.findById(carId);
      console.log(car, carId)
      if (!car) {
        return res.status(404).json({ message: 'Coche no encontrado.' });
      }
  
      // Verificar si el usuario ya está en la lista de favoritos
      const isUserAddToFav = car.fav.includes(userId);
      if (isUserAddToFav) {
        return res.status(400).json({ message: 'El usuario ya está en la lista de favoritos de este coche.' });
      }
  
      car.fav.push(userId);
      await car.save();
  
      res.status(200).json({ message: 'Usuario añadido al favoritos correctamente.' });
    } catch (error) {
      res.status(500).json({ message: 'Error al añadir usuario a favoritos', error: error.message });
    }
  };

  const deleteCarToFav = async (req, res) => {
    try {
      const userId = req.user.userId; // ID del usuario que desea eliminar
      const carId = req.params.carId; // ID del coche
  
      // Buscar el usuario por su ID
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }
  
      // Buscar el coche por su ID
      const car = await carModel.findById(carId);
      if (!car) {
        return res.status(404).json({ message: 'Coche no encontrado.' });
      }
  
      // Verificar si el usuario está en la lista de favoritos
      const isUserInFav = car.fav.includes(userId);
      if (!isUserInFav) {
        return res.status(400).json({ message: 'El usuario no está en la lista de favoritos de este coche.' });
      }
  
      // Eliminar al usuario de la lista de favoritos
      car.fav = car.fav.filter(favUserId => favUserId.toString() !== userId.toString());
      await car.save();
  
      res.status(200).json({ message: 'Usuario eliminado de favoritos correctamente.' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar usuario de favoritos.', error: error.message });
    }
  };
  

const updateCar = async (req, res) => {
    try{
        const id = req.params.id;
        const { marca, modelo, anio, descripcion, precio, foto } = req.body;

        const carAux = await carModel.findById(id);

        if(!carAux) return res.status(404).send('El coche no existe');

        if(marca) {
            carAux.marca = marca
        }
        if(modelo) {
            carAux.modelo = modelo
        }
        if(anio) {
            carAux.anio = anio
        }
        if(descripcion) {
            carAux.descripcion = descripcion
        }
        if(precio) {
            carAux.precio = precio
        }
        if(foto) {
            carAux.foto = foto
        }
        await carAux.save()

        res.status(200).json({
            status: "succeeded",
            data: carAux,
            error: null
        })

    }catch(error){
        res
        .status(500)
        .json({status: "failed", data: null, error: error.message})
    }
}

const deleteCar = async (req, res) => {
    try{
        const id = req.params.id;
        await carModel.findByIdAndDelete(id);
        res.status(200).json({
            status: 'succeeded',
            data: null,
            error: null
        })
    }catch(error){
        res
        .status(500)
        .json({status:"failed", data: null, error: error.message})
    }
}

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
    loadData,
    getCars,
    getCarById,
    getFavCarByUserId,
    createCar,
    addCarToFav,
    deleteCarToFav,
    updateCar,
    deleteCar
}