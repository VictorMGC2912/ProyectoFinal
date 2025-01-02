const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = new User({
      name: name,
      email: email,
      password: await bcrypt.hash(password, 10),
      role: role,
    });

    await user.save();

    res.status(200).json({ status: "succeeded", data: user });
  } catch (error) {

    if(error.code === 11000){
      return res.status(200).json({
        status: "failed",
        message: "El email ya existe",
        
      });
    }
    res.status(200).json({
      status: "failed",
      message: "No se pudo crear el usuario",
      
    });
    
  }
};

module.exports = {
  addUser,
};
