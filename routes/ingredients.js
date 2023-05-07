import express from 'express';
import {ingredientsData} from '../data/index.js';
import verification from '../public/js/verification.js';
import backendVerification from '../public/js/backendVerification.js';
import updateSessionData from "./middleware/updateSessionMiddleware.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const ingredients = await ingredientsData.getAllIngredients();
        console.log("cowabummer");
        res.render('ingredients', {ingredients : ingredients, title : 'Ingredients'})
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/:id', async (req, res) => {    //change to render page
    try {
        const ingredient = await ingredientsData.getIngredientById(req.params.id);
        res.render('ingredients', {ingredient : ingredient, title : 'Ingredients'});
    } catch (e) {
        res.status(404).json({ error: 'Ingredient not found' });
    }
});

router.post('/', async (req, res) => {
    try {
        const ingredientInfo = req.body;
        if (!ingredientInfo) throw 'You must provide data to add an ingredient to your stash!';
        ingredientInfo.name = verification.checkOnlyWordsString(ingredientInfo.name);

        const checkForIngredient = await ingredientsData.getIngredientByName(ingredientInfo.name);
        if(!checkForIngredient) res.redirect('/ingredients/create', {title : 'Ingredient Creation', message: 'Ingredient not in databse, please provide information about it to help us! Thank you'})

        if(ingredientInfo.flavors){
            ingredientInfo.flavors.forEach(flavor => {
                if(!checkForIngredient.flavors.includes(flavor)) checkForIngredient.flavors.push(flavor);
                ingredientsData.updateIngredient(checkForIngredient._id, checkForIngredient.name, checkForIngredient.flavors, checkForIngredient.quantity, checkForIngredient.measurement);
            });
        }
        else{
            ingredientInfo.flavors = checkForIngredient.flavors;
        }
        ingredientInfo.quantity = verification.checkNumber(ingredientInfo.quantity);
        ingredientInfo.measurement = verification.checkOnlyWordsString(ingredientInfo.measurement);
        
        if(!req.session.user){
            req.session.ingredients = req.session.ingredients.push(ingredientInfo);
        }

    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.post('/:id', async (req, res) => {
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

router.get('/create', async (req, res) => {
    try {
        res.render('createIngredient', {title : 'Create Ingredient'});
    } catch (e) {
        res.status(500).send();
    }
}).post('/create', async (req, res) => {
    try {
        const ingredientInfo = req.body;
        if (!ingredientInfo) throw 'You must provide data to create an ingredient';
        ingredientInfo.name = verification.checkOnlyWordsString(ingredientInfo.name);

        const checkForIngredient = await ingredientsData.getIngredientByName(ingredientInfo.name);
        if(checkForIngredient) throw 'Ingredient already exists';

        ingredientInfo.flavors = verification.checkOnlyWordsStringArray(ingredientInfo.flavors);
        
        const newIngredient = await ingredientsData.createIngredient(ingredientInfo.name, ingredientInfo.flavors, 0, 'A lot');
        updateSessionData(req, res, () => {
            res.render('ingredients', {ingredients : newIngredient._id});
        });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});


export default router;