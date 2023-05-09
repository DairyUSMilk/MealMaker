import { recipesData, usersData } from "../data/index.js";
import express from "express";
import verification from "../public/js/verification.js";
import backendVerification from '../public/js/backendVerification.js';
import updateSessionData from "./middleware/updateSessionMiddleware.js";
import isAdminMiddleware from './middleware/isAdminMiddleware.js';
import isLoggedInMiddleware from './middleware/isLoggedInMiddleware.js';
import isAdminOrOwnerMiddleware from './middleware/recipesMiddleware.js';


const router = express.Router();

router
  .get("/", async (req, res) => {
    try {
      let recipes = [];
      if(req.body.filter) recipes = await recipesData.getRecipesByFilter(req.body.filter.userId, req.body.filter.title, req.body.filter.flavors, req.body.filter.ingredients, req.body.filter.readyInMinutes, req.body.filter.likes, req.body.filter.totalScore, req.body.filter.minMatchPercentage, req.body.filter.certified);
      else recipes = await recipesData.getAllRecipes();
      return res.status(200).render("recipes", { title: "Recipes", recipes: recipes, user: req.session.user });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }).post("/",async (req, res) => {
    try {
      const filter = req.body;
      let userId, title, flavors, ingredients, readyInMinutes, likes, totalScore, certified, minMatchPercentage;
  
      if(filter.nameInput) title = verification.checkOnlyWordsString(filter.nameInput, 'title');

      if(filter.flavorsInput){
        if(typeof filter.flavorsInput !== 'string') throw `Error: flavors must be a string`;
        filter.flavorsInput = filter.flavorsInput.split(',');
        flavors = verification.checkOnlyWordsStringArray(filter.flavorsInput, 'flavors');
      }
      if(filter.ingredients){
        if(typeof filter.ingredientsInput !== 'string') throw `Error: ingredients must be a string`;
        ingredients = verification.checkOnlyWordsStringArray(filter.ingredientsInput.split(','));
      } 

      if(filter.readyInput) {
        filter.readInput = Number(filter.readyInput);
        readyInMinutes = verification.checkNumber(filter.readyInput, 'readyInMinutes');
      }

      if(filter.likesInput) {
        likesInput = verification.checkNumber(Number(filter.likesInput), 'likes');
      }

      if(filter.totalScoreInput) totalScore = verification.checkNumber(Number(filter.totalScoreInput), "totalScore");
        
      if(filter.minMatchPercentageInput) {
        minMatchPercentage = verification.checkNumber(Number(filter.minMatchPercentageInput)) / 100;
      }

      if(filter.certifiedInput === true) certified = true;
      else if(filter.certifiedInput === false) certified = false;

      if(filter.username){
        const user = await usersData.getUserByUsername(filter.usernameInput);
        userId = user._id;
      }
      console.log(userId, title, flavors, ingredients, readyInMinutes, likes, totalScore, minMatchPercentage, certified)
      const recipes = await recipesData.getRecipesByFilter(userId, title, flavors, ingredients, readyInMinutes, likes, totalScore, minMatchPercentage, certified);

      return res.render("recipes", { title: "Recipes", recipes: recipes, user: req.session.user});
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });

  router.get("/add", isLoggedInMiddleware, async (req, res) => {
    try {
      if(!req.session.user){
        return res.render('login', {title: 'Login', error: 'You must be logged in to add a recipe'});
      }
      return res.render('recipeInput', {title: 'Recipe Filter Input', user: req.session.user});
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }).post("/add", isLoggedInMiddleware, async (req, res) => {
    const recipeInfo = req.body;
    if (!recipeInfo) {
      res.status(400).render("recipeinput", { title: "Create Recipe", user: req.session.user, error: "You must provide data to create a recipe" });
      return;
    }
    try {
      recipeInfo.title = verification.checkOnlyWordsString(recipeInfo.nameInput, 'nameInput');
      
      // recipeInfo.userId = backendVerification.checkId(recipeInfo.userId);
      
      recipeInfo.userId = req.session.user._id.toString();
  
      if(typeof recipeInfo.flavorsInput !== 'string') throw 'flavorsInput must be a string separated by commas!';
  
      recipeInfo.flavors = verification.checkOnlyWordsStringArray(
        recipeInfo.flavorsInput.split(','), 'flavorsInput'
      );
  
      recipeInfo.servings = verification.checkNumber(Number(recipeInfo.servingsInput), "servingsInput");
  
      if (recipeInfo.imageURL){
        recipeInfo = await backendVerification.checkImgURL(recipeInfo.imageInput, "imageInput");
      }
  
      if(typeof recipeInfo.ingredientsInput !== 'string') throw 'ingredientsInput must be a string separated by commas!';
      recipeInfo.ingredients = verification.checkStringArray(
        recipeInfo.ingredientsInput.split(','), 'ingredientsInput'
      );
  
      if(typeof recipeInfo.instructionsInput !== 'string') throw 'instructionsInput must be a string separated by newlines!';
      recipeInfo.instructions = verification.checkOnlyWordsStringArray(
        recipeInfo.instructionsInput.split(','), 'instructionsInput'
      );
  
      recipeInfo.readyInMinutes = verification.checkNumber(
        Number(recipeInfo.readyInput), "readyInput"
      );
  
      if (recipeInfo.sourceURL){
        recipeInfo.sourceURL = await backendVerification.checkURL(recipeInfo.sourceInput, "sourceURL");
      }
  
      if(req.session.user.role === 'admin' && certifiedInput) recipeInfo.certified = true;
  
      const newRecipe = await recipesData.createRecipe(
        recipeInfo.userId,
        recipeInfo.title,
        recipeInfo.flavors,
        recipeInfo.imageURL,
        recipeInfo.ingredients,
        recipeInfo.instructions,
        recipeInfo.servings,
        recipeInfo.readyInMinutes,
        recipeInfo.sourceURL,
        recipeInfo.certified
      );

      return res.redirect("/recipes/${newRecipe._id}");
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });

router.get("/:id", async (req, res) => {
  try{
    const recipe = await recipesData.getRecipeById(req.params.id);
    return res.render("detailedRecipe", {recipe: recipe, user: req.session.user});
  }catch(e){
    res.status(500).json({ error: e });
  }
}).post("/:id", isAdminOrOwnerMiddleware, async (req, res) => {
  try{

    const recipe = await recipesData.getRecipeById(req.params.id);
    const recipeInfo = req.body;

    if(!recipeInfo) throw 'You must provide data to update a recipe';

    if(recipeInfo.title){
      recipeInfo.title = verification.checkOnlyWordsString(recipeInfo.title, 'title');
    }

    if(recipeInfo.userId){
      recipeInfo.userId = backendVerification.checkId(recipeInfo.userId);
    }

    if(recipeInfo.flavors){
      if(typeof recipeInfo.flavors !== 'string') throw 'flavors must be a string';
      recipeInfo.flavors = verification.checkOnlyWordsStringArray(recipeInfo.flavors.split(','), 'flavors');
    }

    if(recipeInfo.servings){
      recipeInfo.servings = verification.checkNumber(Number(recipeInfo.servings), 'servings');
    }

    if(recipeInfo.imageURL){
      recipeInfo.imageURL = await backendVerification.checkImgURL(recipeInfo.imageURL, 'imageURL');
    }

    if(recipeInfo.ingredients){
      if(typeof recipeInfo.ingredients !== 'string') throw 'ingredients must be a string';
      recipeInfo.ingredients = verification.checkOnlyWordsStringArray(recipeInfo.ingredients.split(','), 'ingredients');
    }

    if(recipeInfo.instructions){
      if(typeof recipeInfo.instructions !== 'string') throw 'instructions must be a string';
      recipeInfo.instructions = verification.checkOnlyWordsStringArray(recipeInfo.instructions.split(','), 'instructions');
    }

    if(recipeInfo.readyInMinutes){
      recipeInfo.readyInMinutes = verification.checkNumber(Number(recipeInfo.readyInMinutes), 'readyInMinutes');
    }

    if(recipeInfo.sourceURL){
      recipeInfo.sourceURL = await backendVerification.checkURL(recipeInfo.sourceURL, 'sourceURL');
    }

    // if(recipeInfo.commentInput){
    //   recipeInfo.commentInput = verification.checkString(recipeInfo.commentInput, 'comments');
    // }
 
    if(req.session.user && req.session.user.role === 'admin' && recipeInfo.certified) recipeInfo.certified = true;
    else certified = false;


    const updatedRecipe = await recipesData.updateRecipe(req.params.id, recipeInfo.userId, recipeInfo.title, recipeInfo.flavors, recipeInfo.imageURL, recipeInfo.ingredients, recipeInfo.instructions, recipeInfo.servings, recipeInfo.readyInMinutes, recipeInfo.sourceURL, recipeInfo.certified, recipeInfo.commentInput);
    
    return res.redirect(`/recipes/${req.params.id}`);
  }catch(e){
    res.status(500).json({ error: e });
  }
}).delete("/:id", isAdminOrOwnerMiddleware, async (req, res) => {
  try{
    const recipe = await recipesData.getRecipeById(req.params.id);
    
    if(!req.session.user || (req.session.user.role !== 'admin' && req.session.user._id !== recipe.userId)){
      res.redirect('/recipes/${req.params.id}');
    }
    const deletedRecipe = await recipesData.deleteRecipe(req.params.id);
    const recipes = await recipesData.getAllRecipes();
    return res.render("recipes", {title: "Recipes", recipes : recipes, message : deletedRecipe + " was successfully deleted", user: req.session.user});
  }catch(e){
    console.log("Delete failed!")
    console.log(e);
    res.status(500).json({ error: e });
  }
});

router.post("/:id/comment", isLoggedInMiddleware, async (req, res) => {
  try{
    const recipe = await recipesData.getRecipeById(req.params.id);
    if(!recipe) throw 'Recipe with id ${req.params.id} not found';
    
    const user = await usersData.getUserById(req.session.user._id);
    if(!user) throw 'User with id ${req.session.user._id} not found';
    
    const commentInfo = req.body;
    if(!commentInfo) throw 'You must provide data to create a comment';
    
    commentInfo.commentInput = verification.checkString(commentInfo.commentInput, 'comment');
    
    const updatedRecipe = await recipesData.addComment(req.params.id, req.session.user._id, commentInfo.commentInput);
    if(!updatedRecipe) throw 'Comment was not added';
    return res.redirect(`/recipes/${updatedRecipe._id}`);
  }catch(e){
    const recipe = await recipesData.getRecipeById(req.params.id);
    if(!recipe){ 
      return res.render("recipes", {title: "Recipes", error: e, user: req.session.user});
    }
    res.status(500).json({ error: error.toString() });
  }
});

router.post("/:id/like", async (req, res) => {
  try {
    const recipe = await recipesData.getRecipeById(req.params.id);
    if(!recipe) throw 'Recipe with id ${req.params.id} not found';
    
    const user = await usersData.getUserById(req.session.user._id.toString());
    if(!user) throw 'User with id ${req.session.user._id} not found';

    const likedRecipe = await recipesData.likeRecipe(req.params.id);
    await usersData.addRecipeToLikedRecipes(req.session.user.username, req.params.id);
    updateSessionData(req, res, () => {
      res.status(200).render("detailedRecipe", { title: likedRecipe.title, recipe: likedRecipe, user: req.session.user, success : "Recipe was successfully liked"});
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

router.post("/:id/dislike", async (req, res) => {
  try {
    const recipeId = req.params.id;
    const username = req.session.user.username;
    recipesData.dislikeRecipe(recipeId);
    await usersData.removeRecipeFromLikedRecipes(username, recipeId);
    const recipes = await recipesData.getAllRecipes();
    updateSessionData(req, res, () => {
      res.status(200).render("recipes", { title: "Profile", recipes: recipes, user: req.session.user, success : "Recipe was successfully disliked"});
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

export default router;
