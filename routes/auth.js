const express = require('express');
const router = express.Router();
const admin = require('../firebase');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password)
  try {
    const userRef = admin.firestore().collection('users');
    console.log("1", userRef)
    const userDoc = await userRef.get();
    console.log("2", userDoc)
    if (userDoc.empty) {
      console.log("No se encontraron documentos");
    } else {
      console.log("Se encontraron documentos");
      userDoc.forEach((doc) => {
        console.log(doc.id, doc.data());
      });
    }
    res.json({ message: 'Login exitoso' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;