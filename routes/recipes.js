import { recipesData, usersData } from "../data/index.js";
import express from "express";
import verification from "../public/js/verification.js";
import backendVerification from '../public/js/backendVerification.js';
import updateSessionData from "./middleware/updateSessionMiddleware.js";
import isAdminMiddleware from './middleware/isAdminMiddleware.js';
import isLoggedInMiddleware from './middleware/isLoggedInMiddleware.js';

const router = express.Router();

router
  .get("/", async (req, res) => {
    try {
      let recipes = [];
      if(req.body.filter) recipes = await recipesData.getRecipesByFilter(req.body.filter.userId, req.body.filter.title, req.body.filter.flavors, req.body.filter.ingredients, req.body.filter.readyInMinutes, req.body.filter.likes, req.body.filter.totalScore, req.body.filter.minMatchPercentage, req.body.filter.certified);
      else recipes = await recipesData.getAllRecipes();
      return res.status(200).render("recipes", { title: "Recipes", recipes: recipes });
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
      console.log("A");
      console.log(userId, title, flavors, ingredients, readyInMinutes, likes, totalScore, minMatchPercentage, certified)
      const recipes = await recipesData.getRecipesByFilter(userId, title, flavors, ingredients, readyInMinutes, likes, totalScore, minMatchPercentage, certified);

      return res.render("recipes", { title: "Recipes", recipes: recipes });
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
    // TODO -- NEED MIDDLEWARE SO ONLY ADMINS CAN ADD CERTIFIED RECIPES
    // Do we still need this? Is this check not sufficient? 
    //        if(req.session.user.role === 'admin' && certifiedInput) recipeInfo.certified = true;

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
      updateSessionData(req, res, () => {
        res.json(newRecipe);
      });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });
  

router
  .get("/add/:id", isLoggedInMiddleware, async (req, res) => {
    try {
      const recipe = await recipesData.get(req.params.id);
      res.json(recipe);
    } catch (e) {
      res.status(404).render("recipes", { title: "Get Recipe", user: req.session.user, error: "Recipe not found"})
    }
  })
  .post("/add/:id", isLoggedInMiddleware, async (req, res) => {
    const recipeInfo = req.body;
    if (!recipeInfo) {
      res.status(400).render("recipes", { title: "Add Recipe", user: req.session.user, error: "You must provide data to create a recipe"});
      return;
    }
    try {
      recipeInfo.title = verification.checkOnlyWordsString(recipeInfo.title);
      recipeInfo.userId = backendVerification.checkId(recipeInfo.userId);
      recipeInfo.flavors = verification.checkOnlyWordsStringArray(
        recipeInfo.flavors
      );
      recipeInfo.servings = verification.checkNumber(recipeInfo.servings);

      if (recipeInfo.imageURL)
        recipeInfo = await backendVerification.checkImgURL(recipeInfo.imageURL);
      recipeInfo.ingredients = verification.checkStringArray(
        recipeInfo.ingredients
      );
      recipeInfo.instructions = verification.checkOnlyWordsStringArray(
        recipeInfo.instructions
      );
      recipeInfo.readyInMinutes = verification.checkNumber(
        recipeInfo.readyInMinutes
      );
      if (recipeInfo.sourceURL)
        recipeInfo.sourceURL = await backendVerification.checkURL(recipeInfo.sourceURL);
        //no certified check since this is update

      const newRecipe = await recipesData.createRecipe(
        recipeInfo.userId,
        recipeInfo.title,
        recipeInfo.flavors,
        recipeInfo.imageURL,
        recipeInfo.ingredients,
        recipeInfo.instructions,
        recipeInfo.servings,
        recipeInfo.readyInMinutes,
        recipeInfo.sourceURL
      );
      updateSessionData(req, res, () => {
        res.json(newRecipe);
      });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });

router.get("/delete", isLoggedInMiddleware, isAdminMiddleware, async (req, res) => {
  let recipes = [];
  try {
    recipes = await recipesData.getAllRecipes();

    if (recipes.length === 0) {
      return res.status(400).render("recipes", { title: "Recipes", recipes: recipes, error: "No recipes to delete"});
    }

  } catch (e) {
    return res.status(400).render("recipes", { title: "Recipes", recipes: recipes, error: "No recipes id provided"});
  }

  return res.status(400).render("recipes", { title: "Recipes", recipes: recipes, error: "No recipes id provided"});
})

router.all("/delete/:id", isLoggedInMiddleware, isAdminMiddleware, async (req, res) => {
  let recipes = [];
  try {
    recipes = await recipesData.getAllRecipes();

    if (recipes.length === 0) {
      return res.status(400).render("recipes", { title: "Recipes", recipes: recipes, error: "No recipes to delete"});
    }

    let deletedRecipe = await recipesData.deleteRecipe(req.params.id);
    recipes = await recipesData.getAllRecipes();

    updateSessionData(req, res, () => {
      res.status(200).render("recipes", { title: "Recipes", recipes: recipes, success: `Recipe: '${deletedRecipe.recipeName}' successfully deleted`});
    });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.get("/:id", async (req, res) => {
  try{
    const recipe = await recipesData.getRecipeById(req.params.id);
    return res.render("detailedRecipe", {recipe: recipe});
  }catch(e){
    res.status(500).json({ error: e });
  }
});

export default router;
