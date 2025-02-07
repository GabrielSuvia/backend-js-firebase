const express = require('express');
const router = express.Router();
const admin = require('../firebase');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await admin.auth().signInWithEmailAndPassword(email, password);
    res.json({ message: 'Login exitoso' });
  } catch (error) {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

module.exports = router;