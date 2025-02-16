const admin = require('firebase-admin');
require('dotenv').config();
const credentialKey = process.env.CREDENTIAL_FIREBASE

console.log(credentialKey)

admin.initializeApp({
  credential: admin.credential.cert(credentialKey),
});  
const auth = getAuth()
module.exports = admin;