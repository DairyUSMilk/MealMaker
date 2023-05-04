import {users} from '../config/mongoCollections.js';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import verification from '../public/js/verification.js';
import { recipesData } from './index.js';

export const userMethods = {
  async createUser (firstName, lastName, username, email, password, role, showUsername) {
    const userCollection = await users();
    if(!userCollection) throw 'Error: could not access user collection';

    firstName = verification.checkName(firstName, 'firstName');
    lastName = verification.checkName(lastName, 'lastName');

    username = verification.checkUsername(username, 'username');
    email = verification.checkEmail(email, 'email');
    const duplicateExists = await userCollection.findOne({$or: [{username: username}, {email: email}]});
    if(duplicateExists) throw 'Error: username or email already in use';

    password = verification.checkPassword(password, 'password');

    if(role === 'admin') role = 'admin';
    // role = verification.checkRole(role);
    let hashPassword = await bcrypt.hash(password, 8);

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
    console.log(newUser.hashedPassword);
    const user = await this.checkUser(email, password);
    if(!user) throw 'Error: could not find user';
    return {insertedUser: true};
  },
  
  async checkUser (emailOrUser, password) {
    if(typeof(emailOrUser) !== 'string') throw 'Error: email or user must be a string!';
    if(verification.isEmail(emailOrUser)) return await this.checkUserByEmail(emailOrUser, password);
    else return await this.checkUserByUsername(emailOrUser, password);
  },

  async checkUserByEmail (email, password) {
    email = verification.checkEmail(email, 'email');
    password = verification.checkPassword(password, 'password');
    
    const userCollection = await users();
    if(!userCollection) throw 'Error: could not access user collection';

    let user = await userCollection.findOne({"email": email});
    if(!user) throw 'Error: no user with that email address';
    if(!await bcrypt.compare(password, user.hashedPassword)) throw 'Error: incorrect password';
    return {_id : user._id, firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email, ingredients: user.ingredients, likedRecipes: user.likedRecipes, recipesCreated: user.recipesCreated, role: user.role, showUsername: user.showUsername};
  },

  async checkUserByUsername (username, password) {
    username = verification.checkUsername(username, 'username');
    password = verification.checkPassword(password, 'password');

    const userCollection = await users();
    if(!userCollection) throw 'Error: could not access user collection';

    let user = await userCollection.findOne({"username": username});
    if(!user) throw 'Error: no user with that username';
    if(!await bcrypt.compare(password, user.hashedPassword)) throw 'Error: incorrect password';
    return {_id : user._id, firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email, ingredients: user.ingredients, likedRecipes: user.likedRecipes, recipesCreated: user.recipesCreated, role: user.role, showUsername: user.showUsername};
  },


  async getLikedRecipes (username) {
    username = verification.checkUsername(username, 'username');
    const userCollection = await users();
    if(!userCollection) throw 'Error: could not access user collection';

    let user = await userCollection.findOne({username: username});
    if(!user) throw 'Error: no user with that username';
    return user.likedRecipes;

  },

  async getRecipesCreated (username) {
    username = verification.checkUsername(username, 'username');
    const userCollection = await users();
    if(!userCollection) throw 'Error: could not access user collection';

    const user = await userCollection.findOne({username: username});
    if(!user) throw 'Error: no user with that username';
    return user.recipesCreated;
  },

  async addRecipeToLikedRecipes (username, recipeId) {
    username = verification.checkUsername(username, 'username');
    const recipe = await recipesData.getRecipeById(ObjectId(recipeId));
    if(!recipe) throw 'Error: no recipe with that id';
    const userCollection = await users();

    const user = await userCollection.findOne({username: username});
    if(!user) throw 'Error: no user with that username';
    if(user.likedRecipes.includes(recipeId)) throw 'Error: recipe already in liked recipes';

    const updatedUser = await userCollection.findOneAndUpdate({username: username}, {$addToSet: {likedRecipes: recipeId}});
    if(!updatedUser) throw 'Error: could not add recipe to liked recipes';

    return {recipeAdded : recipe, user: updatedUser};
  },

  async addRecipeToCreatedRecipes (username, recipeId) {
    username = verification.checkUsername(username, 'username');
    const recipe = await recipesData.getRecipeById(ObjectId(recipeId));
    if(!recipe) throw 'Error: no recipe with that id';
    const userCollection = await users();

    const user = await userCollection.findOne({username: username});
    if(!user) throw 'Error: no user with that username';
    if(user.recipesCreated.includes(recipeId)) throw 'Error: recipe already in created recipes';

    const updatedUser = await userCollection.findOneAndUpdate({username: username}, {$addToSet: {recipesCreated: recipeId}});
    if(!updatedUser) throw 'Error: could not add recipe to created recipes';

    return {recipeAdded : recipe, user: updatedUser};
  },

  async removeRecipeFromLikedRecipes (username, recipeId) {
    username = verification.checkUsername(username, 'username');
    const recipe = await recipesData.getRecipeById(ObjectId(recipeId));
    if(!recipe) throw 'Error: no recipe with that id';
    const userCollection = await users();

    const user = await userCollection.findOne({username: username});
    if(!user) throw 'Error: no user with that username';
    if(!user.likedRecipes.includes(recipeId)) throw 'Error: recipe not in liked recipes';

    const updatedUser = await userCollection.findOneAndUpdate({username: username}, {$pull: {likedRecipes: recipeId}});
    if(!updatedUser) throw 'Error: could not remove recipe from liked recipes';

    return {recipeRemoved : recipe, user: updatedUser};
  },

  async removeRecipeFromCreatedRecipes (username, recipeId) {
    username = verification.checkUsername(username, 'username');
    const recipe = await recipesData.getRecipeById(ObjectId(recipeId));
    if(!recipe) throw 'Error: no recipe with that id';
    const userCollection = await users();

    const user = await userCollection.findOne({username: username});
    if(!user) throw 'Error: no user with that username';
    if(!user.recipesCreated.includes(recipeId)) throw 'Error: recipe not in created recipes';

    const updatedUser = await userCollection.findOneAndUpdate({username: username}, {$pull: {recipesCreated: recipeId}});
    if(!updatedUser) throw 'Error: could not remove recipe from created recipes';

    return {recipeRemoved : recipe, user: updatedUser};
  },

  async addIngredientToUser (username, ingredientId, quantity, measurement) {
    username = verification.checkUsername(username, 'username');
    ingredientId = verification.checkId(ingredientId, 'ingredientId');
    quantity = verification.checkNumber(quantity, 'quantity');
    measurement = verification.checkOnlyWordsString(measurement, 'measurement');

    const userCollection = await users();
    const user = await userCollection.findOne({username: username});
    if(!user) throw 'Error: no user with that username';
    if(user.ingredients.includes(ingredientId)) throw 'Error: ingredient already in user ingredients';

    const updatedUser = await userCollection.findOneAndUpdate({username: username}, {$addToSet: {ingredients: {ingredientId: ingredientId, quantity: quantity, measurement: measurement}}});
    if(!updatedUser) throw 'Error: could not add ingredient to user';

    return {ingredientAdded : ingredientId, user: updatedUser};
  },

  async removeIngredientFromUser (username, ingredientId) {
    username = verification.checkUsername(username, 'username');
    ingredientId = verification.checkId(ingredientId, 'ingredientId');

    const userCollection = await users();
    const user = await userCollection.findOne({username: username});
    if(!user) throw 'Error: no user with that username';
    if(!user.ingredients.includes(ingredientId)) throw 'Error: ingredient not in user ingredients';

    const updatedUser = await userCollection.findOneAndUpdate({username: username}, {$pull: {ingredients: {ingredientId: ingredientId}}});
    if(!updatedUser) throw 'Error: could not remove ingredient from user';

    return {ingredientRemoved : ingredientId, user: updatedUser};
  },

  async changePassword (username, oldPassword, newPassword) {
    username = verification.checkUsername(username, 'username');
    oldPassword = verification.checkPassword(oldPassword, 'oldPassword');
    newPassword = verification.checkPassword(newPassword, 'newPassword');

    const userCollection = await users();
    const user = await userCollection.findOne({username: username});
    if(!user) throw 'Error: no user with that username';
    if(!await bcrypt.compare(oldPassword, user.hashedPassword)) throw 'Error: incorrect password';

    const hashPassword = await bcrypt.hash(newPassword, 8);
    const updatedUser = await userCollection.findOneAndUpdate({username: username}, {$set: {hashedPassword: hashPassword}});
    if(!updatedUser) throw 'Error: could not change password';

    return {passwordChanged : true, user: updatedUser};
  },

  async changeUsername (username, newUsername) {
    username = verification.checkUsername(username, 'username');
    newUsername = verification.checkUsername(newUsername, 'newUsername');

    const userCollection = await users();
    const user = await userCollection.findOne({username: username});
    if(!user) throw 'Error: no user with that username';
    if(await userCollection.findOne({username: newUsername})) throw 'Error: username already in use';

    const updatedUser = await userCollection.findOneAndUpdate({username: username}, {$set: {username: newUsername}});
    if(!updatedUser) throw 'Error: could not change username';

    return {usernameChanged : true, user: updatedUser};
  }

}

export default userMethods;
