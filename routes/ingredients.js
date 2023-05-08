import express from 'express';
import {ingredientsData} from '../data/index.js';
import verification from '../public/js/verification.js';
import backendVerification from '../public/js/backendVerification.js';
import updateSessionData from "./middleware/updateSessionMiddleware.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let message = '';
        if(req.body.message) message = req.body.message;
        res.render('ingredients', {ingredients : req.session.ingredients, title : 'Your Ingredients Stash!', message : message});
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
        const ingredientInfo = {
            name : req.body.nameInput,
            flavors : req.body.flavorsInput,
            quantity : req.body.quantityInput,
            measurement : req.body.measurementInput
        };
        if (!ingredientInfo) throw 'You must provide data to add an ingredient to your stash!';
        ingredientInfo.name = verification.checkOnlyWordsString(ingredientInfo.name, "ingredient name").toUpperCase();

        if(!ingredientInfo.flavors) ingredientInfo.flavors = [];
        else ingredientInfo.flavors = verification.checkOnlyWordsStringArray(ingredientInfo.flavors.split(',').map(s => s.trim()), "ingredient flavors");
        
        ingredientInfo.quantity = verification.checkNumber(Number(ingredientInfo.quantity), "quantity");
        if(Number.isNaN(ingredientInfo.quantity)) throw 'Error: ingredient quantity must be a number!';

        ingredientInfo.measurement = verification.checkOnlyWordsString(ingredientInfo.measurement, "measurement");
        const checkForIngredient = await ingredientsData.getIngredientByName(ingredientInfo.name);
        if(!checkForIngredient) {
            const newIngredient = await ingredientsData.createIngredient(ingredientInfo.name, ingredientInfo.flavors, 0, "DB");
            ingredientInfo._id = newIngredient._id;
        } else {
            const updatedIngredient = await ingredientsData.addFlavorsToIngredient(ingredientInfo.name, ingredientInfo.flavors);
            ingredientInfo._id = updatedIngredient._id;
            ingredientInfo.flavors = updatedIngredient.flavors;
        }
        console.log("AAA");
        try{
            if(req.session.ingredients.some(ingredient => ingredient.name === ingredientInfo.name)){
                req.session.ingredients = req.session.ingredients.map(
                  (ingredient) => {
                    if (ingredient.name === ingredientInfo.name){
                        return ingredientInfo;
                    }
                    else return ingredient;
                  }
                );
            } 
            else req.session.ingredients.push(ingredientInfo);
        } catch (e) {
            console.log(e);
            console.log(req.session.ingredients);
        }
        if(req.session.user) await usersData.addIngredientToUser(req.session.user.username, ingredientInfo._id, ingredientInfo.flavors, ingredientInfo.quantity, ingredientInfo.measurement);
        res.redirect('/ingredients'); //need a way to pass the message that a new thing is added
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