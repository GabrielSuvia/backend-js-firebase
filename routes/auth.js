const express = require('express');
const router = express.Router();
const User = require('../models/User')
const admin = require('../firebase');
const jwt = require('jsonwebtoken')
require('dotenv').config();
//const credentialKey = process.env.CREDENTIAL_FIREBASE

const createToken = async (id,rol="visitor")=>{
const payload = {
  sub:id,
  rol
}
const token = jwt.sign(payload,process.env.SECRET_KEY);
return token;
}


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const userList = await User.getAllUsers(admin);
    const userFound = userList.filter((user)=> user.email === email && user.password === password);

    if(userFound.length === 1){
    const token = await createToken(userFound[0].id,"user");
    return res.status(200).json({ message: token });
    };

   return res.status(401).json({ error: 'Credenciales no validas' });

  } catch (error) {
   return res.status(401).json({ error: 'Credenciales no validas' });
  }
});

module.exports = router;