const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert('ruta/a/tu/clave.json'),
  databaseURL: 'https://tu-proyecto.firebaseio.com'
});

module.exports = admin;