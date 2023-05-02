import express from 'express';
import {ingredientsData} from '../data/index.js';

const router = express.router();

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
    const ingredientInfo = req.body;
    if (!ingredientInfo) {
        res.status(400).json({ error: 'You must provide data to create an ingredient' });
        return;
    }
    if (!ingredientInfo.name) {
        res.status(400).json({ error: 'You must provide a name for the ingredient' });
        return;
    }
    if (!ingredientInfo.type) {
        res.status(400).json({ error: 'You must provide a type for the ingredient' });
        return;
    }
    try {
        const newIngredient = await ingredientsData.create(ingredientInfo.name, ingredientInfo.type);
        res.json(newIngredient);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.put('/:id', async (req, res) => {
    const ingredientInfo = req.body;
    if (!ingredientInfo) {
        res.status(400).json({ error: 'You must provide data to update an ingredient' });
        return;
    }
    if (!ingredientInfo.name) {
        res.status(400).json({ error: 'You must provide a name for the ingredient' });
        return;
    }
    if (!ingredientInfo.type) {
        res.status(400).json({ error: 'You must provide a type for the ingredient' });
        return;
    }
    try {
        await ingredientsData.get(req.params.id);
    } catch (e) {
        res.status(404).json({ error: 'Ingredient not found' });
        return;
    }
    try {
        const updatedIngredient = await ingredientsData.update(req.params.id, ingredientInfo.name, ingredientInfo.type);
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