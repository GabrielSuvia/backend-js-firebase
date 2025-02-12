const express = require('express');
const router = express.Router();
const admin = require('../firebase');
const User = require('../models/User');

  
router.get('/', async (req, res) => {
  try {
    const users = await User.getAllUsers(admin);
    res.json(users);
  } catch (error) {
    res.status(404).json({ error: 'No existen usuario' });
  }
 
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.getUserById(admin, id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

router.post('/create', async (req, res) => {

  try {

    const newUser = req.body;
    const response = await User.addUser(admin, newUser);
      res.json(response);
      
  } catch (error) {

    res.status(400).json({ error: 'Bad request' });
  }
 

});


module.exports = router;