import { recipesData } from "../data/index.js";
import express from "express";
import verification from "../public/js/verification.js";
import backendVerification from '../public/js/backendVerification.js';
import updateSessionData from "./middleware/updateSessionMiddleware.js";
import isAdminMiddleware from './middleware/isAdminMiddleware.js';

const router = express.Router();

router
  .get("/", async (req, res) => {
    try {
      let recipes = await recipesData.getAllRecipes();
      if(req.body.filter) recipes = await recipesData.getRecipeByFilter(req.body.filter.userId, req.body.filter.title, req.body.filter.flavors, req.body.filter.ingredients, req.body.filter.readyInMinutes, req.body.filter.likes, req.body.filter.totalScore, req.body.filter.minMatchPercentage, req.body.filter.certified);

      
      return res.render("recipes", { title: "Recipes", recipes: recipes});
    } catch (e) {
      res.status(500).send();
    }
  })
  .post("/", async (req, res) => {
    const recipeInfo = req.body;
    if (!recipeInfo) {
      res
        .status(400)
        .json({ error: "You must provide data to create a recipe" });
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
        recipeInfo = await backendVerification.checkURL(recipeInfo.imageURL);
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
      if (recipeInfo.certified !== true) recipeInfo.certified = false;

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
  .get("/:id", async (req, res) => {
    try {
      const recipe = await recipesData.get(req.params.id);
      res.json(recipe);
    } catch (e) {
      res.status(404).json({ error: "Recipe not found" });
    }
  })
  .post("/:id", async (req, res) => {
    const recipeInfo = req.body;
    if (!recipeInfo) {
      res
        .status(400)
        .json({ error: "You must provide data to create a recipe" });
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
        recipeInfo = await backendVerification.checkURL(recipeInfo.imageURL);
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

router.all("/delete/:id", isAdminMiddleware, async (req, res) => {
  try {
    let recipes = await recipesData.getAllRecipes();
    let deletedRecipe = await recipesData.deleteRecipe(req.params.id);
    recipes = await recipesData.getAllRecipes();

    updateSessionData(req, res, () => {
      res.status(200).render("recipes", { title: "Recipes", recipes: recipes, success: `Recipe: '${deletedRecipe.recipeName}' successfully deleted`});
    });
  } catch (e) {
    return res.status(500).render("recipes", { title: "Recipes", recipes: recipes, error: `${e}`});
  }
});

router.get(
  "/filter",
  async (req, res) => {
    try {
      const recipes = await recipesData.getRecipesByFilter(req.body.filter);
      return res.json(recipes);
    } catch (e) {
      res.status(500).send();
    }
  }

  //TODO : FILTER
);

export default router;
