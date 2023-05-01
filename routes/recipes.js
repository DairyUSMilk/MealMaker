import { recipesData } from "../data/index.js";
import express from "express";

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
    if (!recipeInfo.title) {
        res.status(400).json({ error: "You must provide a title for the recipe" });
        return;
    }
    if (!recipeInfo.ingredients) {
        res.status(400).json({ error: "You must provide ingredients for the recipe" });
        return;
    }
    if (!recipeInfo.steps) {
        res.status(400).json({ error: "You must provide steps for the recipe" });
        return;
    }
    try {
        const newRecipe = await recipesData.create(recipeInfo.title, recipeInfo.ingredients, recipeInfo.steps);
        res.json(newRecipe);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});