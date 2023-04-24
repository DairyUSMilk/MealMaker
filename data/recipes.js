import {recipes, users} from './mongoCollections.js';
import verification from '../public/js/verification.js';

export const recipeMethods = {
    async createRecipe(
        userId,
        title,
        flavors,
        imageURL,
        ingredients,
        instructions,
        servings,
        readyInMinutes,
        sourceUrl
    ){
        userId = verification.checkId(userId, 'userId');
        title = verification.checkString(title, 'title');
        flavors = verification.checkStringArray(flavors, 'flavors');
        flavors.forEach
        imageURL = verification.checkString(imageURL, 'imageURL');
        ingredients = verification.checkStringArray(ingredients, 'ingredients');
        ingredients.forEach(ingredient => {
            verification.checkOnlyWordsString(ingredient, 'ingredient');
        });
        instructions = verification.checkString(instructions, 'instructions');
        servings = verification.checkNumber(servings, 'servings');
        readyInMinutes = verification.checkNumber(readyInMinutes, 'readyInMinutes');
        sourceUrl = verification.checkString(sourceUrl, 'sourceUrl');
        //need to add a check for the url
        
        const recipe = {
            userId : userId,
            title : title,
            flavors : flavors,
            imageURL : imageURL,
            ingredients : ingredients,
            instructions : instructions,
            servings : servings,
            readyInMinutes : readyInMinutes,
            sourceUrl : sourceUrl,
            comments : [],
            likes : 0,
            dislikes : 0
        };

        let recipeCollection = await recipes();
        let insertInfo = await recipeCollection.insertOne(recipe);
        if (insertInfo.insertedCount === 0) throw 'Could not add recipe';
        let newId = insertInfo.insertedId;
        const newRecipe = await this.getRecipeById(newId);
        return newRecipe;
    },

    async getRecipeById(id){
        id = verification.checkId(id, 'id');
        const recipeCollection = await recipes();
        const recipe = await recipeCollection.findOne({_id : id});
        if (recipe === null) throw 'No recipe with that id';
        return recipe;
    },

    async getAllRecipes(){
        const recipeCollection = await recipes();
        const recipeList = await recipeCollection.find({}).toArray();
        return recipeList;
    },

    //might try to figure out a more efficient way to do search by ingredient.
    //technically doesn't matter but -- for my own enrichment
    async getRecipesByIngredient(ingredient){
        ingredient = verification.checkOnlyWordsString(ingredient, 'ingredient');
        const recipeCollection = await recipes();
        const recipeList = await recipeCollection.find({ingredients : {$in : [ingredient]}}).toArray();
        return recipeList;
    },

    async getRecipesByFlavor(flavor){
        flavor = verification.checkOnlyWordsString(flavor, 'flavor');
        const recipeCollection = await recipes();
        const recipeList = await recipeCollection.find({flavors : {$in : [flavor]}}).toArray();
        return recipeList;
    },

    async getRecipesByTitle(title){
        title = verification.checkOnlyWordsString(title, 'title');
        const recipeCollection = await recipes();
        const recipeList = await recipeCollection.find({title : {$regex : title, $options : 'i'}}).toArray();
        return recipeList;
    },

    async getRecipesByUser(userId){
        userId = verification.checkId(userId, 'userId');
        const recipeCollection = await recipes();
        const recipeList = await recipeCollection.find({userId : userId}).toArray();
        return recipeList;
    },

    // async updateRecipe(id, updatedRecipe){
    //     id = verification.checkId(id, 'id');
    //     updatedRecipe = verification.checkObject(updatedRecipe, 'updatedRecipe');
    //     const recipeCollection = await recipes();
    //     const updatedRecipeData = {};

    //     if (updatedRecipe.title) updatedRecipeData.title = verification.checkString(updatedRecipe.title, 'title');
    //     if (updatedRecipe.flavors){
    //         updatedRecipeData.flavors = verification.checkStringArray(updatedRecipe.flavors, 'flavors');
    //         updatedRecipeData.flavors.forEach(flavor => {
    //             verification.checkOnlyWordsString(flavor, 'flavor');
    //         });
    //     }
    //     if (updatedRecipe.imageURL) updatedRecipeData.imageURL = verification.checkString(updatedRecipe.imageURL, 'imageURL');
    //     if (updatedRecipe.ingredients){
    //         updatedRecipeData.ingredients = verification.checkStringArray(updatedRecipe.ingredients, 'ingredients');
    //         updatedRecipeData.ingredients.forEach(ingredient => {
    //             verification.checkOnlyWordsString(ingredient, 'ingredient');
    //         });
    //     }
    //     if (updatedRecipe.instructions) updatedRecipeData.instructions = verification.checkString(updatedRecipe.instructions, 'instructions');
    //     if (updatedRecipe.servings) updatedRecipeData.servings = verification.checkNumber(updatedRecipe.servings, 'servings');
    //     if (updatedRecipe.readyInMinutes) updatedRecipeData.readyInMinutes = verification.checkNumber(updatedRecipe.readyInMinutes, 'readyInMinutes');
    //     if (updatedRecipe.sourceUrl) updatedRecipeData.sourceUrl = verification.checkString(updatedRecipe.sourceUrl, 'sourceUrl');

    //     let updateCommand = {$set : updatedRecipeData};
    //     let query = {_id : id};

    //     await recipeCollection.updateOne(query, updateCommand);

    //     return await this.getRecipeById(id);
    // }

}

export default recipeMethods