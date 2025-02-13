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

  try {
    const user = await User.getUserById(admin, id);//mando error
      console.log("1")
      if(user){
        res.json(user);
      }
     
  } catch (error) {
    console.log("2")
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
 
});

router.post('/create', async (req, res) => {
  const newUser = req.body;

  try {
      //add credential in firebase
      await admin.auth().createUser({
      email: newUser.email,
      password: newUser.password,})

    const response = await User.addUser(admin, newUser);
      res.json(response);
      
  } catch (error) {

    res.status(400).json({ error: 'Bad request' });
  }
 

});


module.exports = router;