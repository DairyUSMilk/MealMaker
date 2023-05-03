import {users} from '../config/mongoCollections.js';
import bcrypt from 'bcrypt';
import verification from '../public/js/verification.js';

export const userMethods = {
  async createUser (firstName, lastName, username, email, password, role, showUsername) {
    const userCollection = await users();
    if(!userCollection) throw 'Error: could not access user collection';

    firstName = verification.checkName(firstName, 'firstName');
    lastName = verification.checkName(lastName, 'lastName');
    username = verification.checkUsername(username, 'username');
    email = verification.checkEmail(email, 'email');
    password = verification.checkPassword(password, 'password');
    role = verification.checkRole(role);
    let hashPassword = await bcrypt.hash(password, 16);

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      hashedPassword: hashPassword,
      ingredients: [],
      likedRecipes: [],
      recipesCreated: [],
      role: role,
      showUsername: showUsername
    }
    
    const insertInfo = await userCollection.insertOne(newUser);
    if(insertInfo.insertedCount === 0) throw 'Error: could not add user';
    const user = await checkUser(email, password);
    if(!user) throw 'Error: could not find user';
    return {insertedUser: true};
  },
  
  async checkUser (emailOrUser, password) {
    if(typeof(emailOrUser) !== 'string') throw 'Error: email or user must be a string!';
    if(verification.isEmail(emailOrUser)) return await checkUserByEmail(emailOrUser, password);
    else return await checkUserByUsername(emailOrUser, password);
  },

  async checkUserByEmail (email, password) {
    email = verification.checkEmail(email, 'email');
    password = verification.checkPassword(password, 'password');
    
    const userCollection = await users();
    if(!userCollection) throw 'Error: could not access user collection';

    let user = userCollection.findOne({email: email});
    if(!user) throw 'Error: no user with that email address';
    if(!await bcrypt.compare(password, user.hashedPassword)) throw 'Error: incorrect password';
    return {_id : user._id, firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email, ingredients: user.ingredients, likedRecipes: user.likedRecipes, recipesCreated: user.recipesCreated, role: user.role, showUsername: user.showUsername};
  },

  async checkUserByUsername (username, password) {
    username = verification.checkUsername(username, 'username');
    password = verification.checkPassword(password, 'password');

    const userCollection = await users();
    if(!userCollection) throw 'Error: could not access user collection';

    let user = userCollection.findOne({username: username});
    if(!user) throw 'Error: no user with that username';
    if(!await bcrypt.compare(password, user.hashedPassword)) throw 'Error: incorrect password';
    return {_id : user._id, firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email, ingredients: user.ingredients, likedRecipes: user.likedRecipes, recipesCreated: user.recipesCreated, role: user.role, showUsername: user.showUsername};
  },


  async getLikedRecipes (username) {
    username = verification.checkUsername(username, 'username');
    const userCollection = await users();
    if(!userCollection) throw 'Error: could not access user collection';

    let user = userCollection.findOne({username: username});
    if(!user) throw 'Error: no user with that username';
    return user.likedRecipes;

  }

}


