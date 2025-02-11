const express = require('express');
const router = express.Router();
const admin = require('../firebase');
const User = require('../models/User');

  
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

  try {

    const newUser = req.body;
    const response = await User.addUser(admin, newUser);
      res.json(response);
      
  } catch (error) {

    res.status(500).json({ message: 'Error al crear el usuario' });
  }
 

});


module.exports = router;