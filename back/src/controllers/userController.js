const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../../utils/utils");

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

const login = async (req, res) => {
  try {

    const { email, password } = req.body;
    //Comprobacion si existe el email en la BD
    const user = await User.findOne({email: email});
    if (user) {
      // Compara la contraseña enviada en la solicitud con la contraseña almacenada en el documento encontrado
      const validPassword = await bcrypt.compare(password, user.password);
      if(validPassword) {
        //ToDo: GENERAR TOKEN
        //Payload para pasar al generador de token que es una funcion que nos traemos de utils
        const payload = {
          userId: user._id,
          name: user.name,
          email: user.email
        };
        const token = generateToken(payload, false);
        const token_refresh = generateToken(payload, true);

        return res.status(200).json({status: "succeeded", data: user, token: token, token_refresh: token_refresh});
      } else {
        return res.status(200).json({
          status: "failed",
          message: "Email y contraseña no coinciden",
        });
      }

    } else {
      return res.status(200).json({
        status: "failed",
        message: "Email y contraseña no coinciden",
      });
    }


  }catch(error) {
    res.status(400).json({
      status: "failed",
      message: "No se ha podido hacer login",
      error: error.message,
      
    });
  }
}

module.exports = {
  addUser,
  login
};
