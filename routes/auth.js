const express = require('express');
const router = express.Router();
const admin = require('../firebase');
let auth = {email:"pablo@hotmail.com",password:"35535535"}
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = auth//await admin.auth().signInWithEmailAndPassword(email, password);
    res.json({ json:auth,message: 'Login exitoso' });
  } catch (error) {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

module.exports = router;