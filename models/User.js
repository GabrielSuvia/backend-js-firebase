class User {
    constructor(id, name, email) {
      this.id = id;
      this.name = name;
      this.email = email;
    }
  
    static async getAllUsers(admin) {
      const usersRef = admin.firestore().collection('users');
      const usersSnap = await usersRef.get();
      return usersSnap.docs.map(doc => new User(doc.id, doc.data().name, doc.data().email));
    }
  
    static async getUserById(admin, id) {
      const userRef = admin.firestore().collection('users').doc(id);
      const userSnap = await userRef.get();
      if (userSnap.exists) {
        return new User(userSnap.id, userSnap.data().name, userSnap.data().email);
      } else {
        return null;
      }
    }
  }
  
  module.exports = User;