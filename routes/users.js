const express = require('express');
const router = express.Router();
const admin = require('../firebase');
const User = require('../models/user');

let user= {name:"jose" ,email:"joseLias@hotmail.com", password:"3558265"}

router.get('/', async (req, res) => {
  const users = user//await User.getAllUsers(admin);
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const user =user// await User.getUserById(admin, id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
});

module.exports = router;