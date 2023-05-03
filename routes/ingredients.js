import express from 'express';
import {ingredientsData} from '../data/index.js';
import verification from '../public/js/verification.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const ingredients = await ingredientsData.getAll();
        res.json(ingredients);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/:id', async (req, res) => {    //change to render page
    try {
        const ingredient = await ingredientsData.get(req.params.id);
        res.json(ingredient);
    } catch (e) {
        res.status(404).json({ error: 'Ingredient not found' });
    }
});

router.post('/', async (req, res) => {
    try {
        const ingredientInfo = req.body;
        if (!ingredientInfo) throw 'You must provide data to create an ingredient';
        ingredientInfo.name = verification.checkOnlyWordsString(ingredientInfo.name);
        ingredientInfo.flavors = verification.checkOnlyWordsStringArray(ingredientInfo.flavors);
        ingredientInfo.quantity = verification.checkNumber(ingredientInfo.quantity);
        ingredientInfo.measurement = verification.checkOnlyWordsString(ingredientInfo.measurement);
        
        const newIngredient = await ingredientsData.create(ingredientInfo.name, ingredientInfo.type);
        res.json(newIngredient);
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
        
        req.params.id = verification.checkId(req.params.id);

        const updatedIngredient = await ingredientsData.updateIngredient(req.params.id, ingredientInfo.name, ingredientInfo.flavors, ingredientInfo.quantity, ingredientInfo.measurement);
        res.json(updatedIngredient);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await ingredientsData.get(req.params.id);
    } catch (e) {
        res.status(404).json({ error: 'Ingredient not found' });
        return;
    }
    try {
        await ingredientsData.remove(req.params.id);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

export default router;