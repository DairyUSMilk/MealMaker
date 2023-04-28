import {recipes, users, ingredients} from './mongoCollections.js';
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
        title = verification.checkOnlyWordsString(title, 'title');
        flavors = verification.checkOnlyWordsStringArray(flavors, 'flavors');
        flavors.forEach
        imageURL = verification.checkString(imageURL, 'imageURL');
        // ingredients = verification.checkOnlyWordsStringArray(ingredients, 'ingredients');
        // ingredients.forEach(ingredient => {
        //     verification.checkOnlyWordsString(ingredient, 'ingredient');
        // });

        //need a check for ingredients in their database

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

    async updateRecipe(id, updatedRecipe){
        id = verification.checkId(id, 'id');
        updatedRecipe = verification.checkObject(updatedRecipe, 'updatedRecipe');
        const recipeCollection = await recipes();
        const updatedRecipeData = {};

        if (updatedRecipe.title) updatedRecipeData.title = verification.checkString(updatedRecipe.title, 'title');
        if (updatedRecipe.flavors){
            updatedRecipeData.flavors = verification.checkStringArray(updatedRecipe.flavors, 'flavors');
            updatedRecipeData.flavors.forEach(flavor => {
                verification.checkOnlyWordsString(flavor, 'flavor');
            });
        }
        if (updatedRecipe.imageURL) updatedRecipeData.imageURL = verification.checkString(updatedRecipe.imageURL, 'imageURL');
        if (updatedRecipe.ingredients){
            updatedRecipeData.ingredients = verification.checkStringArray(updatedRecipe.ingredients, 'ingredients');
            updatedRecipeData.ingredients.forEach(ingredient => {
                verification.checkOnlyWordsString(ingredient, 'ingredient');
            });
        }
        if (updatedRecipe.instructions) updatedRecipeData.instructions = verification.checkString(updatedRecipe.instructions, 'instructions');
        if (updatedRecipe.servings) updatedRecipeData.servings = verification.checkNumber(updatedRecipe.servings, 'servings');
        if (updatedRecipe.readyInMinutes) updatedRecipeData.readyInMinutes = verification.checkNumber(updatedRecipe.readyInMinutes, 'readyInMinutes');
        if (updatedRecipe.sourceUrl) updatedRecipeData.sourceUrl = verification.checkString(updatedRecipe.sourceUrl, 'sourceUrl');

        let query = {_id : id};
        let updateCommand = {$set : updatedRecipeData};
        
        await recipeCollection.updateOne(query, updateCommand);

        return await this.getRecipeById(id);
    },

    async deleteRecipe(id){
        id = verification.checkId(id, 'id');
        const recipeCollection = await recipes();
        let recipeName = await this.getRecipeById(id);
        let deleted = recipeCollection.deleteOne({_id : id});
        if (deleted.deletedCount === 0) throw 'Could not delete recipe';
        return {recipeName, deleted : true};
    },

    async addComment(recipeId, userId, comment){
        recipeId = verification.checkId(recipeId, 'recipeId');
        userId = verification.checkId(userId, 'userId');
        comment = verification.checkString(comment, 'comment');
        let recipe = await this.getRecipeById(recipeId);
        let recipeCollection = await recipes();
        let newComment = {
            userId : userId,
            comment : comment
        };
        recipe.comments.push(newComment);
        let query = {_id : recipeId};
        let updateCommand = {$set : recipe};
        await recipeCollection.updateOne(query, updateCommand);
        return await this.getRecipeById(recipeId);
    },

    async deleteComment(recipeId, commentId){
        recipeId = verification.checkId(recipeId, 'recipeId');
        commentId = verification.checkId(commentId, 'commentId');
        let recipe = await this.getRecipeById(recipeId);
        let recipeCollection = await recipes();
        let newComments = recipe.comments.filter(comment => comment._id !== commentId);
        recipe.comments = newComments;
        let query = {_id : recipeId};
        let updateCommand = {$set : recipe};
        await recipeCollection.updateOne(query, updateCommand);
        return await this.getRecipeById(recipeId);
    },

    async likeRecipe(recipeId){
        recipeId = verification.checkId(recipeId, 'recipeId');
        let recipe = await this.getRecipeById(recipeId);
        let recipeCollection = await recipes();
        recipe.likes++;
        let query = {_id : recipeId};
        let updateCommand = {$set : recipe};
        await recipeCollection.updateOne(query, updateCommand);
        return await this.getRecipeById(recipeId);
    },

    async dislikeRecipe(recipeId){
        recipeId = verification.checkId(recipeId, 'recipeId');
        let recipe = await this.getRecipeById(recipeId);
        let recipeCollection = await recipes();
        recipe.dislikes++;
        let query = {_id : recipeId};
        let updateCommand = {$set : recipe};
        await recipeCollection.updateOne(query, updateCommand);
        return await this.getRecipeById(recipeId);
    },

    // async getRecipeByFilter(filter){
    //     let title = '';
    //     let flavors = [];
    //     let ingredients = [];
    //     let readyInMinutes = 0;
    //     let likes = 0;
    //     let minMatchPercentage = .7;


    //     if(filter.title) title = verification.checkOnlyWordsString(filter.title, 'title');
    //     if(filter.flavors){
    //         flavors = verification.checkStringArray(filter.flavors, 'flavors');
    //         flavors.forEach(flavor => {
    //             verification.checkOnlyWordsString(flavor, 'flavor');
    //         });
    //     }
    //     if(filter.ingredients){
    //         ingredients = verification.checkStringArray(filter.ingredients, 'ingredients');
    //         ingredients.forEach(ingredient => {
    //             verification.checkOnlyWordsString(ingredient, 'ingredient');
    //         });
    //     }
    //     if(filter.readyInMinutes) readyInMinutes = verification.checkNumber(filter.readyInMinutes, 'readyInMinutes');
    //     if(filter.likes) likes = verification.checkNumber(filter.likes, 'likes');
    //     if(filter.dislikes) dislikes = verification.checkNumber(filter.dislikes, 'dislikes');
    //     if(filter.minMatchPercentage) minMatchPercentage = verification.checkNumber(filter.minMatchPercentage, 'minMatchPercentage');

    //     let query = {
    //         $and : [
    //             {title : {$regex : title, $options : 'i'}},
    //             {flavors : {$all : flavors}},
    //             {ingredients : {$gte: [{ $divide: [ { $size: { $setIntersection: [ "$ingredients", ingredients ] } }, { $size: "$ingredients" } ] }, minMatchPercentage]}},
    //             {readyInMinutes : {$lte : readyInMinutes}},
    //             {likes : {$gte : likes}},
    //             //NEED TO FIGURE OUT DISLIKES AND TOTALSCORE
    //         ]
    //     }

    //     const recipeCollection = await recipes();
    //     const recipeList = await recipeCollection.find(query).toArray();



    // }

}

export default recipeMethods