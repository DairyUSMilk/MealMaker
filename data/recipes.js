import {recipes} from '../config/mongoCollections.js';
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
        sourceUrl,
        certified
    ){
        userId = verification.checkId(userId, 'userId');
        title = verification.checkOnlyWordsString(title, 'title');
        flavors = verification.checkOnlyWordsStringArray(flavors, 'flavors');
        imageURL = await verification.checkURL(imageURL, 'imageURL');
        ingredients = verification.checkOnlyWordsStringArray(ingredients, 'ingredients');
        //need a check for ingredients in their database

        instructions = verification.checkStringArray(instructions, 'instructions');
        servings = verification.checkNumber(servings, 'servings');
        readyInMinutes = verification.checkNumber(readyInMinutes, 'readyInMinutes');
        if(sourceUrl) sourceUrl = await verification.checkURL(sourceUrl, 'sourceUrl');
        //need url specific checks
        if(typeof(certified) != boolean) throw 'certified must be a boolean';
        
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
            dislikes : 0,
            certified : certified
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

    // TODO -- Get recipes liked by user

    async getAllRecipes(){
        const recipeCollection = await recipes();
        const recipeList = await recipeCollection.find({}).toArray();
        return recipeList;
    },

    async updateRecipe(id, userId, title, flavors, imageURL, ingredients, instructions, servings, readyInMinutes, sourceUrl){
        id = verification.checkId(id, 'id');
        const recipeCollection = await recipes();
        const currentRecipe = await this.getRecipeById(id);
        
        let updatedRecipeData = currentRecipe;

        //basically, if the field is not null, then we update it
        if(userId) updatedRecipeData.userId = verification.checkId(userId, 'userId');
        if (title) updatedRecipeData.title = verification.checkOnlyWordsString(title, 'title');
        if (flavors) updatedRecipeData.flavors = verification.checkOnlyWordsStringArray(flavors, 'flavors');
        if (imageURL) updatedRecipeData.imageURL = await verification.checkURL(imageURL, 'imageURL');
        if (ingredients) updatedRecipeData.ingredients = verification.checkOnlyWordsStringArray(ingredients, 'ingredients');
        if (instructions) updatedRecipeData.instructions = verification.checkOnlyWordsStringArray(instructions, 'instructions');
        if (servings) updatedRecipeData.servings = verification.checkNumber(servings, 'servings');
        if (readyInMinutes) updatedRecipeData.readyInMinutes = verification.checkNumber(readyInMinutes, 'readyInMinutes');
        if (sourceUrl) updatedRecipeData.sourceUrl = await verification.checkURL(sourceUrl, 'sourceUrl');

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
        let newComments = recipe.comments.filter(comment => comment._id == commentId);
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

    async getRecipeByFilter(userId, title, flavors, ingredients, readyInMinutes, likes, totalScore, minMatchPercentage, certified){
        let query = {};

        if(userId) query.userId = verification.checkId(userId, 'userId');
        if(title) query.title = {$regex : verification.checkOnlyWordsString(title, 'title'), $options : 'i'};
        if(flavors) query.flavors = {$all : verification.checkOnlyWordsStringArray(flavors, 'flavors')};
        if(ingredients) query.ingredients = {$gte: [{ $divide: [ { $size: { $setIntersection: [ "$ingredients", verification.checkOnlyWordsStringArray(ingredients, 'ingredients') ] } }, { $size: "$ingredients" } ] }, verification.checkNumber(minMatchPercentage, 'minMatchPercentage')]};
        if(readyInMinutes) query.readyInMinutes = {$lte : verification.checkNumber(readyInMinutes, 'readyInMinutes')};
        if(likes) query.likes = {$gte : verification.checkNumber(likes, 'likes')};
        if(totalScore) query.dislikes = {$lte : verification.checkNumber(likes - totalScore, 'totalScore')};
        if(certified === true) query.certified = true;

        const recipeCollection = await recipes();
        const recipeList = await recipeCollection.find(query).toArray();

        return recipeList;
    }

    //PROTOTYPE:
    // async getRecipeByFilter(userId, title, flavors, ingredients, readyInMinutes, likes, totalScore, minMatchPercentage){
        
    //     let query_userId, query_title, query_flavors, query_ingredients, query_readyInMinutes, query_likes, query_totalScore, query_minMatchPercentage;
        
    //     if(userId) query_userId = verification.checkId(userId, 'userId');
    //     if(title) query_title = verification.checkOnlyWordsString(title, 'title');
    //     if(flavors) query_flavors = verification.checkOnlyWordsStringArray(flavors, 'flavors');
    //     if(ingredients) query_ingredients = verification.checkOnlyWordsStringArray(ingredients, 'ingredients');
    //     if(readyInMinutes) query_readyInMinutes = verification.checkNumber(readyInMinutes, 'readyInMinutes');
    //     if(likes) query_likes = verification.checkNumber(likes, 'likes');
    //     if(totalScore) query_totalScore = verification.checkNumber(totalScore, 'totalScore');
    //     if(minMatchPercentage && (minMatchPercentage > 1 || minMatchPercentage <= 0)){
    //         query_minMatchPercentage = verification.checkNumber(minMatchPercentage, 'minMatchPercentage');
    //     }
        
    //     let queryV2 = {
    //         $and : [
    //             {title : {$regex : query_title, $options : 'i'}},
    //             {userId : query_userId},
    //             {flavors : {$all : query_flavors}},
    //             {ingredients : {$gte: [{ $divide: [ { $size: { $setIntersection: [ "$ingredients", query_ingredients ] } }, { $size: "$ingredients" } ] }, query_minMatchPercentage]}},
    //             {readyInMinutes : {$lte : query_readyInMinutes}},
    //             {likes : {$gte : query_likes}},
    //             {dislikes : {$lte : query_likes - query_totalScore}}
    //         ]
    //     }

    //     const recipeCollection = await recipes();
    //     const recipeList = await recipeCollection.find(queryV2).toArray();

    //     return recipeList;
    // }


}

export default recipeMethods