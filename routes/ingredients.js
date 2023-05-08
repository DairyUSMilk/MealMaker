import express from 'express';
import {ingredientsData} from '../data/index.js';
import verification from '../public/js/verification.js';
import backendVerification from '../public/js/backendVerification.js';
import updateSessionData from "./middleware/updateSessionMiddleware.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        console.log(req.session.ingredients);
        res.render('ingredients', {ingredients : req.session.ingredients, title : 'Your Ingredients Stash!'})
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/add', async (req, res) => {
    try {
        res.render('ingredientInput', {title : 'Create Ingredient'});
    } catch (e) {
        res.status(500).send();
    }
}).post('/add', async (req, res) => {  //add ingredient to user's stash. Also add ingredient to database if not already there
    try {
        const ingredientInfo = req.body;
        if (!ingredientInfo) throw 'You must provide data to add an ingredient to your stash!';
        ingredientInfo.nameInput = verification.checkOnlyWordsString(ingredientInfo.nameInput, "ingredient name");

        if(!ingredientInfo.flavorsInput) ingredientInfo.flavorsInput = [];
        else ingredientInfo.flavorsInput = verification.checkOnlyWordsStringArray(ingredientInfo.flavorsInput.split(',').map(s => s.trim()), "ingredient flavors");
        
        ingredientInfo.quantityInput = verification.checkNumber(Number(ingredientInfo.quantityInput), "quantity");
        if(Number.isNaN(ingredientInfo.quantityInput)) throw 'Error: ingredient quantity must be a number!';

        ingredientInfo.measurementInput = verification.checkOnlyWordsString(ingredientInfo.measurementInput, "measurement");
        const checkForIngredient = await ingredientsData.getIngredientByName(ingredientInfo.nameInput);
        if(!checkForIngredient) {
            const newIngredient = await ingredientsData.createIngredient(ingredientInfo.nameInput, ingredientInfo.flavorsInput, 0, "DB");
            console.log(newIngredient);
            ingredientInfo._id = newIngredient._id;
        } else {
            ingredientInfo._id = checkForIngredient._id;
            const updatedIngredient = await ingredientsData.addFlavorsToIngredient(ingredientInfo.nameInput, ingredientInfo.flavorsInput);
            console.log("updated ingredient:");
            console.log(updatedIngredient);
        }
        console.log("AAA");
        console.log(req.session.ingredients);
        try{req.session.ingredients.push(ingredientInfo);
        } catch (e) {
            console.log(e);
            console.log(req.session.ingredients);
        }
        console.log(req.session.ingredients);
        console.log("yeeeeee")
        if(req.session.user) await usersData.addIngredientToUser(req.session.user.username, ingredientInfo._id, ingredientInfo.flavorsInput, ingredientInfo.quantityInput, ingredientInfo.measurementInput);
        console.log("yeeeeeeeeeee")
        res.render("ingredients", {
          title: "Ingredients",
          message:
            "" +
            ingredientInfo.quantityInput +
            " " +
            ingredientInfo.measurementInput +
            " of " +
            ingredientInfo.nameInput +
            " has been added to your stash!",
        });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.get('/:id', async (req, res) => {    //change to render page
    try {
        const ingredient = await ingredientsData.getIngredientById(req.params.id);
        res.render('ingredients', {ingredients : [ingredient], title : ingredient.name});
    } catch (e) {
        res.status(404).json({ error: 'Ingredient not found' });
    }
});

router.post('/:id', async (req, res) => {   //update a specific ingredient
    try {
        const ingredientInfo = req.body;
        if (!ingredientInfo) throw 'You must provide data to create an ingredient';
        ingredientInfo.name = verification.checkOnlyWordsString(ingredientInfo.name);
        ingredientInfo.flavors = verification.checkOnlyWordsStringArray(ingredientInfo.flavors);
        ingredientInfo.quantity = verification.checkNumber(ingredientInfo.quantity);
        ingredientInfo.measurement = verification.checkOnlyWordsString(ingredientInfo.measurement);
        
        req.params.id = backendVerification.checkId(req.params.id);

        const updatedIngredient = await ingredientsData.updateIngredient(req.params.id, ingredientInfo.name, ingredientInfo.flavors, ingredientInfo.quantity, ingredientInfo.measurement);
        updateSessionData(req, res, () => {
            res.render('ingredients', {message: '' + updatedIngredient.name + ' has been updated!'});
        });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.delete('/:id', async (req, res) => {
    let ingredient;
    try {
        ingredient = await ingredientsData.getIngredientById(req.params.id);
    } catch (e) {
        res.status(404).json({ error: 'Ingredient not found' });
        return;
    }
    try {
        await ingredientsData.deleteIngredient(req.params.id);
        updateSessionData(req, res, () => {
            res.status(200).render('ingredients', {message: ingredient.name + ' has been deleted!'});
        });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});




export default router;