class User {
    constructor(id, name, email, password) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password = password;
    }
  
    static async getAllUsers(admin) {
      const usersRef = admin.firestore().collection('users');
      const usersSnap = await usersRef.get();
      return usersSnap.docs.map(doc => new User(doc.id, doc.data().name, doc.data().email, doc.data().password ));
    }
  
    static async getUserById(admin, id) {
      const userRef = admin.firestore().collection('users').doc(id);
      const userSnap = await userRef.get();
        return new User(userSnap.id, userSnap.data().name, userSnap.data().email, userSnap.data().password );
    }

    static async addUser(admin, user) {
      const userRef = admin.firestore().collection('users').add(
        {
          name:user.name,
          email:user.email,
          password:user.password
         });
     return {id:userRef.id,...userRef};
    }
  }
  
  module.exports = User;