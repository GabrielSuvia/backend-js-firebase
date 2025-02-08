const admin = require('firebase-admin');
const keyDb= require('./serviceAccountKey')

admin.initializeApp({
  credential: admin.credential.cert(keyDb),
 // databaseURL: 'https://tu-proyecto.firebaseio.com'
});

module.exports = admin;