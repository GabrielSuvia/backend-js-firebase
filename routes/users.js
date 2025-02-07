const express = require('express');
const router = express.Router();
const admin = require('../firebase');
const User = require('../models/user');

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

module.exports = router;