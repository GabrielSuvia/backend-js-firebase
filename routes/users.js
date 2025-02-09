const express = require('express');
const router = express.Router();
const admin = require('../firebase');
const User = require('../models/user');

//let user= {name:"jose" ,email:"joseLias@hotmail.com", password:"3558265"}

router.get('/', async (req, res) => {
  const users = await User.getAllUsers(admin);
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.getUserById(admin, id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
});

router.post('/create', async (req, res) => {
  console.log("problemasaaaaa")
  try {
    console.log("22")
    const newUser = req.body;
    console.log("33", req.body)
    const response = await User.addUser(admin, newUser);
    console.log("44", req.body)
  
      res.json(response);
  } catch (error) {
    console.log("there is a problem")
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
 

});


module.exports = router;