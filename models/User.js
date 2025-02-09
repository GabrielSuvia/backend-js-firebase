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
      if (userSnap.exists) {
        return new User(userSnap.id, userSnap.data().name, userSnap.data().email, doc.data().password );
      } else {
        return null;
      }
    }

    static async addUser(admin, user) {
      console.log("user1")
      const userRef = admin.firestore().collection('users').add(
        {
          name:user.name,
          email:user.email,
          password:user.password
         });

      console.log("user2")
     return {id:userRef.id,...userRef};
    }
  }
  
  module.exports = User;