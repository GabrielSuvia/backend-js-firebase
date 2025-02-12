const express = require('express');
const router = express.Router();
const admin = require('../firebase');
const User = require('../models/User')

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const listUser = await User.getAllUsers(admin);
    console.log("ARRAY", listUser)
    const userFound = listUser.filter((ele)=> ele.password === password && ele.email === email)
    console.log(typeof userFound)
    if (!userFound) {
      console.log("No se encontraron documentos");
    } else {
      console.log("Se encontraron documentos", userFound);
    }
    console.log("todo bien")
    res.status(200).json({ message: 'Login exitoso' });
    
  } catch (error) {;
    res.status(401).json({ error: 'Credenciales no validas' });
  }
});

module.exports = router;