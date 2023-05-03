import { recipesData } from "../data/index.js";
import express from "express";
import verification from "../public/js/verification.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const recipes = await recipesData.getRecipesByFilter(req.body.filter);
        return res.json(recipes);
    } catch (e) {
        res.status(500).send();
    }
}).post("/", async (req, res) => {
    const recipeInfo = req.body;
    if (!recipeInfo) {
        res.status(400).json({ error: "You must provide data to create a recipe" });
        return;
    }
    try {
        recipeInfo.title = verification.checkOnlyWordsString(recipeInfo.title);
        recipeInfo.userId = verification.checkId(recipeInfo.userId);
        recipeInfo.flavors = verification.checkOnlyWordsStringArray(recipeInfo.flavors);
        recipeInfo.servings = verification.checkNumber(recipeInfo.servings);
        
        if(recipeInfo.imageURL) recipeInfo = verification.checkURL(recipeInfo.imageURL);
        recipeInfo.ingredients = verification.checkStringArray(recipeInfo.ingredients);
        recipeInfo.instructions = verification.checkOnlyWordsStringArray(recipeInfo.instructions);
        recipeInfo.readyInMinutes = verification.checkNumber(recipeInfo.readyInMinutes);
        if(recipeInfo.sourceURL) recipeInfo.sourceURL = verification.checkURL(recipeInfo.sourceURL);

        const newRecipe = await recipesData.createRecipe(recipeInfo.userId, recipeInfo.title, recipeInfo.flavors, recipeInfo.imageURL, recipeInfo.ingredients, recipeInfo.instructions, recipeInfo.servings, recipeInfo.readyInMinutes, recipeInfo.sourceURL);
        res.json(newRecipe);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.get("/:id", async (req, res) => {
    try{
        const recipe = await recipesData.get(req.params.id);
        res.json(recipe);
    }
    catch(e){
        res.status(404).json({ error: "Recipe not found" });
    }
}).post("/:id", async (req, res) => {
    const recipeInfo = req.body;
    if (!recipeInfo) {
        res.status(400).json({ error: "You must provide data to create a recipe" });
        return;
    }
    try {
        recipeInfo.title = verification.checkOnlyWordsString(recipeInfo.title);
        recipeInfo.userId = verification.checkId(recipeInfo.userId);
        recipeInfo.flavors = verification.checkOnlyWordsStringArray(recipeInfo.flavors);
        recipeInfo.servings = verification.checkNumber(recipeInfo.servings);
        
        if(recipeInfo.imageURL) recipeInfo = verification.checkURL(recipeInfo.imageURL);
        recipeInfo.ingredients = verification.checkStringArray(recipeInfo.ingredients);
        recipeInfo.instructions = verification.checkOnlyWordsStringArray(recipeInfo.instructions);
        recipeInfo.readyInMinutes = verification.checkNumber(recipeInfo.readyInMinutes);
        if(recipeInfo.sourceURL) recipeInfo.sourceURL = verification.checkURL(recipeInfo.sourceURL);

        const newRecipe = await recipesData.createRecipe(recipeInfo.userId, recipeInfo.title, recipeInfo.flavors, recipeInfo.imageURL, recipeInfo.ingredients, recipeInfo.instructions, recipeInfo.servings, recipeInfo.readyInMinutes, recipeInfo.sourceURL);
        res.json(newRecipe);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});