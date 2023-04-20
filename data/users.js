import {users} from '../config/mongoCollections.js';
import bcrypt from 'bcrypt';
import verification from '../public/js/verification.js';

export const createUser = async (
  firstName,
  lastName,
  email,
  password,
  role
) => {
  const userCollection = await users();
  if(!userCollection) throw 'Error: could not access user collection';

  firstName = verification.checkName(firstName, 'firstName');
  lastName = verification.checkName(lastName, 'lastName');
  email = verification.checkEmail(email, 'email');
  password = verification.checkPassword(password, 'password');
  let hashPassword = await bcrypt.hash(password, 16);
  if(role !== 'admin' || role !== 'community') throw 'Error: role must be either admin or community';

  const newUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    hashedPassword: hashPassword,
    ingredients: [],
    likedRecipes: [],
    recipesCreated: [],
    role: role
  }
  
  const insertInfo = await userCollection.insertOne(newUser);
  if(insertInfo.insertedCount === 0) throw 'Error: could not add user';
  const user = await checkUser(email, password);
  if(!user) throw 'Error: could not find user';
  return {insertedUser: true};
};

export const checkUser = async (email, password) => {
  email = verification.checkEmail(email, 'email');
  password = verification.checkPassword(password, 'password');
  
  const userCollection = await users();
  if(!userCollection) throw 'Error: could not access user collection';

  let user = userCollection.findOne({email: email});
  if(!user) throw 'Error: no user with that email address';
  if(!await bcrypt.compare(password, user.hashedPassword)) throw 'Error: incorrect password';
  return {firstName: user.firstName, lastName: user.lastName, email: user.email, ingredients: user.ingredients, likedRecipes: user.likedRecipes, recipesCreated: user.recipesCreated, role: user.role};
};
