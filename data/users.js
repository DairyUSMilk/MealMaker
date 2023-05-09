import {users} from '../config/mongoCollections.js';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import verification from '../public/js/verification.js';
import backendVerification from '../public/js/backendVerification.js';
import { recipesData, ingredientsData } from './index.js';

const usersMethods = {
  async createUser (firstName, lastName, username, email, password, role, showUsername) {
    const userCollection = await users();
    if(!userCollection) throw 'Error: could not access user collection';

    firstName = verification.checkName(firstName, 'firstName');
    lastName = verification.checkName(lastName, 'lastName');

    username = verification.checkUsername(username, 'username').toLowerCase();
    email = verification.checkEmail(email, 'email').toLowerCase();
    const duplicateExists = await userCollection.findOne({$or: [{username: username}, {email: email}]});
    if(duplicateExists) throw 'Error: username or email already in use';

    password = verification.checkPassword(password, 'password');

    role = verification.checkRole(role);
    showUsername = (showUsername === 'on') ? true : false;

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
    const user = await this.checkUser(email, password);
    if(!user) throw 'Error: could not find user';
    return {_id : user._id, firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email, ingredients: user.ingredients, likedRecipes: user.likedRecipes, recipesCreated: user.recipesCreated, role: user.role, showUsername: user.showUsername};
  },
  
  async checkUser (emailOrUser, password) {
    if(typeof(emailOrUser) !== 'string') throw 'Error: email or user must be a string!';
    if(verification.isEmail(emailOrUser)) return await this.checkUserByEmail(emailOrUser.toLowerCase(), password);
    else return await this.checkUserByUsername(emailOrUser.toLowerCase(), password);
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

  async getUserById (id) {
    const userCollection = await users();
    if(!userCollection) throw 'Error: could not access user collection';

    let user = await userCollection.findOne({"_id": new ObjectId(id)});
    if(!user) throw 'Error: no user with that id';
    return {_id : user._id, firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email, ingredients: user.ingredients, likedRecipes: user.likedRecipes, recipesCreated: user.recipesCreated, role: user.role, showUsername: user.showUsername};
  },

  async getUserByUsername (username) {
    username = verification.checkUsername(username, 'username').toLowerCase();
    const userCollection = await users();
    if(!userCollection) throw 'Error: could not access user collection';

    let user = await userCollection.findOne({"username": username});
    if(!user) throw 'Error: no user with that username';
    return {_id : user._id, firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email, ingredients: user.ingredients, likedRecipes: user.likedRecipes, recipesCreated: user.recipesCreated, role: user.role, showUsername: user.showUsername};
  },
  
  async getIngredients (username) {
    username = verification.checkUsername(username, 'username').toLowerCase();
    const userCollection = await users();
    if(!userCollection) throw 'Error: could not access user collection';

    let user = await userCollection.findOne({username: username});
    if(!user) throw 'Error: no user with that username';
    return user.ingredients;
    
  },

  async getLikedRecipes (username) {
    username = verification.checkUsername(username, 'username').toLowerCase();
    const userCollection = await users();
    if(!userCollection) throw 'Error: could not access user collection';

    let user = await userCollection.findOne({username: username});
    if(!user) throw 'Error: no user with that username';
    return user.likedRecipes;

  },

  async getRecipesCreated (username) {
    username = verification.checkUsername(username, 'username').toLowerCase();
    const userCollection = await users();
    if(!userCollection) throw 'Error: could not access user collection';

    const user = await userCollection.findOne({username: username});
    if(!user) throw 'Error: no user with that username';
    return user.recipesCreated;
  },

  async addRecipeToLikedRecipes (username, recipeId) {
    username = verification.checkUsername(username, 'username').toLowerCase();
    const recipe = await recipesData.getRecipeById(recipeId);
    if(!recipe) throw 'Error: no recipe with that id';
    const userCollection = await users();

    const user = await userCollection.findOne({username: username});
    if(!user) throw 'Error: no user with that username';
    if (user.likedRecipes.some((recipe) => recipe._id.toString() === recipeId.toString())) throw 'Error: recipe already in liked recipes';

    const updatedUser = await userCollection.findOneAndUpdate({username: username}, {$addToSet: {likedRecipes: recipe}});
    if(!updatedUser) throw 'Error: could not add recipe to liked recipes';

    const updatedRecipe = await recipesData.likeRecipe(recipeId);

    return {recipeAdded : updatedRecipe, user: updatedUser};
  },

  async addRecipeToCreatedRecipes (username, recipeId) {
    username = verification.checkUsername(username, 'username').toLowerCase();
    const recipe = await recipesData.getRecipeById(recipeId); 
    if(!recipe) throw 'Error: no recipe with that id';
    recipe._id = recipe._id.toString()
    const userCollection = await users();

    const user = await userCollection.findOne({username: username});
    if(!user) throw 'Error: no user with that username';
    if(user.recipesCreated.includes(recipeId)) throw 'Error: recipe already in created recipes';

    const updatedUser = await userCollection.findOneAndUpdate({username: username}, {$addToSet: {recipesCreated: recipe}});
    if(!updatedUser) throw 'Error: could not add recipe to created recipes';

    return {recipeAdded : recipe, user: updatedUser};
  },

  async removeRecipeFromLikedRecipes (username, recipeId) {
    username = verification.checkUsername(username, 'username').toLowerCase();
    const recipe = await recipesData.getRecipeById(recipeId);
    if(!recipe) throw 'Error: no recipe with that id';
    const userCollection = await users();

    const user = await userCollection.findOne({username: username});
    if(!user) throw 'Error: no user with that username';

    if (!user.likedRecipes.some((recipe) => recipe._id.toString() === recipeId.toString())) throw 'Error: recipe not in liked recipes';

    const updatedUser = await userCollection.findOneAndUpdate({username: username}, {$pull: {likedRecipes: recipe}});
    if(!updatedUser) throw 'Error: could not remove recipe from liked recipes';

    return {recipeRemoved : recipe, user: updatedUser};
  },

  async removeRecipeFromCreatedRecipes (username, recipeId) {
    username = verification.checkUsername(username, 'username').toLowerCase();
    const recipe = await recipesData.getRecipeById(recipeId);
    if(!recipe) throw 'Error: no recipe with that id';
    const userCollection = await users();

    const user = await userCollection.findOne({username: username});
    if(!user) throw 'Error: no user with that username';
    if(!user.recipesCreated.includes(recipeId)) throw 'Error: recipe not in created recipes';

    const updatedUser = await userCollection.findOneAndUpdate({username: username}, {$pull: {recipesCreated: recipe}});
    if(!updatedUser) throw 'Error: could not remove recipe from created recipes';

    return {recipeRemoved : recipe, user: updatedUser};
  },

  async addIngredientToUser (username, ingredientId) {
    username = verification.checkUsername(username, 'username').toLowerCase();
    ingredientId = backendVerification.checkId(ingredientId, 'ingredientId');
    
    const ingredient = await ingredientsData.getIngredientById(ingredientId);

    const userCollection = await users();
    const user = await userCollection.findOne({username: username});
    if(!user) throw 'Error: no user with that username';
    if(user.ingredients.includes(ingredientId)) throw 'Error: ingredient already in user ingredients';

    const updatedUser = await userCollection.findOneAndUpdate({username: username}, {$addToSet: {ingredients: ingredient}});
    if(!updatedUser) throw 'Error: could not add ingredient to user';

    return {ingredientAdded : ingredientId, user: updatedUser};
  },

  async removeIngredientFromUser (username, ingredientId) {
    username = verification.checkUsername(username, 'username').toLowerCase();
    ingredientId = backendVerification.checkId(ingredientId, 'ingredientId');

    const ingredient = await ingredientsData.getIngredientById(ingredientId);

    const userCollection = await users();
    const user = await userCollection.findOne({username: username});
    if(!user) throw 'Error: no user with that username';
    if(!user.ingredients.includes(ingredientId)) throw 'Error: ingredient not in user ingredients';

    const updatedUser = await userCollection.findOneAndUpdate({username: username}, {$pull: {ingredients: ingredient}});
    if(!updatedUser) throw 'Error: could not remove ingredient from user';

    return {ingredientRemoved : ingredientId, user: updatedUser};
  },

  async changePassword (username, oldPassword, newPassword) {
    username = verification.checkUsername(username, 'username').toLowerCase();
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
    username = verification.checkUsername(username, 'username').toLowerCase();
    newUsername = verification.checkUsername(newUsername, 'newUsername');

    const userCollection = await users();
    const user = await userCollection.findOne({username: username});
    if(!user) throw 'Error: no user with that username';
    if(await userCollection.findOne({username: newUsername})) throw 'Error: username already in use';

    const updatedUser = await userCollection.findOneAndUpdate({username: username}, {$set: {username: newUsername}});
    if(!updatedUser) throw 'Error: could not change username';

    return {usernameChanged : true, user: updatedUser};
  },


}

export default usersMethods;