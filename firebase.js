const admin = require('firebase-admin');
require('dotenv').config();
const credentialKey = process.env.CREDENTIAL_FIREBASE

console.log(credentialKey)

admin.initializeApp({
  credential: admin.credential.cert(credentialKey),
 // databaseURL: 'https://tu-proyecto.firebaseio.com'
});

module.exports = admin;