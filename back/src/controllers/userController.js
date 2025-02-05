const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/utils");

//CONSEGUIR LOS USUARIOS
const getAllUser = async (req, res) => {
  try{
    const allUser = await User.find();
    const resUser = allUser.map(user => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role
      }
    })
    res.status(200).json({
      status: 'succeeded',
      data: resUser,
      error: null
  })
  }catch(error) {
    res
        .status(500)
        .json({status: "failed", data: null, error: error.message})
  }
}

//AGREGAR NUEVO USUARIO
const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = new User({
      name: name,
      email: email,
      password: await bcrypt.hash(password, 10),// Encriptacion de la contraseña
      role: role,
    });

    await user.save(); //Guardamos el usuario

    res.status(200).json({ status: "succeeded", data: user });
  } catch (error) {
    //Error si el email ya existe
    if(error.code === 11000){
      return res.status(200).json({
        status: "failed",
        message: "El email ya existe",
        
      });
    }
    //Cualquier error al crear el usuario
    res.status(400).json({
      status: "failed",
      message: "No se pudo crear el usuario",
      
    });
    
  }
};

//ACTUALIZAR DATOS DEL USUARIO
const updateUser = async (req, res) => {
  try {
    const id = req.params.id; // ID del usuario
    const updatedData = req.body; // Datos enviados desde el frontend

    // Busca y actualiza el usuario en la base de datos
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ status: 'failed', error: 'Usuario no encontrado' });
    }

    res.status(200).json({ status: 'succeeded', data: updatedUser });
  } catch (error) {
    res.status(500).json({ status: 'failed', error: error.message });
  }
};

//HACER LOGIN DEL USUARIO
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Comprobación si existe el email en la BD
    const user = await User.findOne({ email: email }).lean();
    if (!user) {
      // Devuelve 404 si el usuario no existe
      return res.status(404).json({
        status: "failed",
        message: "Usuario no encontrado",
      });
    }

    // Compara la contraseña enviada con la contraseña almacenada
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      // Devuelve 401 si la contraseña es incorrecta
      return res.status(401).json({
        status: "failed",
        message: "Contraseña incorrecta",
      });
    }

    // Generar los tokens si todo está correcto
    const payload = {
      userId: user._id,
      name: user.name,
      email: user.email,
    };
    const token = generateToken(payload, false);
    const token_refresh = generateToken(payload, true);

    // Respuesta exitosa
    return res.status(200).json({
      status: "succeeded",
      data: user,
      _id: user._id,
      role: user.role,
      token: token,
      token_refresh: token_refresh,
    });
  } catch (error) {
    // Manejo de errores generales
    res.status(500).json({
      status: "failed",
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

//CONSEGUIR DATOS DE USUARIO POR ID
const getUserById = async (req, res) => {
  try{
    const id = req.params.id;
    const user = await User.findById(id);
    console.log(user)
    res.status(200).json({
      status: "succeeded",
      data: user,
      error:null
    })
  }catch(error){
    res
        .status(500)
        .json({status: "failed", data: null, error: error.message})
  }

}

//BORRAR USUARIOS
const deleteUser = async (req, res) => {
  try{
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.status(200).json({
      status: 'succeeded',
      data: null,
      error: null
    })
  }catch(error){
    res
    .status(500)
    .json({status: "failed", data: null, error: error.message})
  }
}

module.exports = {
  getAllUser,
  addUser,
  updateUser,
  login,
  getUserById,
  deleteUser
};
