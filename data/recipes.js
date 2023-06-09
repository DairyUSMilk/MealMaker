import {recipes, users} from '../config/mongoCollections.js';
import verification from '../public/js/verification.js';
import backendVerification from '../public/js/backendVerification.js';
import { ObjectId } from 'mongodb';
import { ingredientsData, usersData } from './index.js';

const recipesMethods = {
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
        userId = backendVerification.checkId(userId, 'userId');
        title = verification.checkOnlyWordsString(title, 'title');
        flavors = verification.checkOnlyWordsStringArray(flavors, 'flavors');
        imageURL = await backendVerification.checkURL(imageURL, 'imageURL');
        for(let i = 0; i < ingredients.length; i++){
            if(typeof ingredients[i] !== "object"){
                throw "Error: elements in ingredients array must be objects" 
            }
            for(let n = 0; n < ingredients[i].length; n++){
                if(typeof ingredients[i][0] !== "number"){
                    throw "ingredient id must be number"
                }
                if(typeof ingredients[i][1] !== "string"){
                    throw "ingredient name must be string"
                }
                if(!(Array.isArray(ingredients[i][2]))){
                    throw "ingredient flavors must be an array"
                }
                if(typeof ingredients[i][3] !== "number"){
                    throw "ingredient quantity must be a number"
                }
                if(typeof ingredients[i][4] !== "string"){
                    throw "ingredient measurement must be a string"
                }
            }
        }
        //need a check for ingredients in their database

        instructions = verification.checkStringArray(instructions, 'instructions');
        servings = verification.checkNumber(servings, 'servings');
        readyInMinutes = verification.checkNumber(readyInMinutes, 'readyInMinutes');
        if(sourceUrl) sourceUrl = await backendVerification.checkURL(sourceUrl, 'sourceUrl');
        //need url specific checks
        if(typeof(certified) != "boolean") throw 'certified must be a boolean';
        
        const recipe = {
            userId : userId,
            title : title,
            flavors : flavors,
            imageURL : imageURL,
            ingredients : [],
            instructions : instructions,
            servings : servings,
            readyInMinutes : readyInMinutes,
            sourceUrl : sourceUrl,
            comments : [],
            likes : 0,
            dislikes : 0,
            certified : certified
        };

        for (let i = 0; i < ingredients.length; i++) {
            const ingredient = ingredients[i];
            const ingredientId = await ingredientsData.getIngredientByName2(ingredient.name);
            recipe.ingredients.push({
              id: ingredientId,
              name: ingredient.name,
              flavors: ingredient.flavors,
              quantity: ingredient.quantity,
              measurement: ingredient.measurement
            });
          }

        let recipeCollection = await recipes();
        let insertInfo = await recipeCollection.insertOne(recipe);
        if (insertInfo.insertedCount === 0) throw 'Could not add recipe';
        let newId = insertInfo.insertedId.toString();
        const newRecipe = await this.getRecipeById(newId);
        const userCollection = await users();
        const user = await userCollection.findOne({_id : new ObjectId(userId)});
        await usersData.addRecipeToCreatedRecipes(user.username, newId)
        return newRecipe;
    },

    async getRecipeById(id){
        id = backendVerification.checkId(id, 'id');
        const recipeCollection = await recipes();
        const recipe = await recipeCollection.findOne({_id : new ObjectId(id)});
        if (recipe === null) throw 'No recipe with that id';
        return recipe;
    },

    async getAllRecipes(){
        const recipeCollection = await recipes();
        const recipeList = await recipeCollection.find({}).toArray();
        return recipeList;
    },

    async updateRecipe(id, userId, title, flavors, imageURL, ingredients, instructions, servings, readyInMinutes, sourceUrl, certified, comments){
        id = backendVerification.checkId(id, 'id');
        const recipeCollection = await recipes();
        const currentRecipe = await this.getRecipeById(id);
        
        let updatedRecipeData = currentRecipe;

        //basically, if the field is not null, then we update it
        if(userId) updatedRecipeData.userId = backendVerification.checkId(userId, 'userId');
        if (title) updatedRecipeData.title = verification.checkOnlyWordsString(title, 'title');
        if (flavors) updatedRecipeData.flavors = verification.checkOnlyWordsStringArray(flavors, 'flavors');
        if (imageURL) updatedRecipeData.imageURL = await backendVerification.checkURL(imageURL, 'imageURL');
        if (ingredients) updatedRecipeData.ingredients = verification.checkOnlyWordsStringArray(ingredients, 'ingredients');
        if (instructions) updatedRecipeData.instructions = verification.checkOnlyWordsStringArray(instructions, 'instructions');
        if (servings) updatedRecipeData.servings = verification.checkNumber(servings, 'servings');
        if (readyInMinutes) updatedRecipeData.readyInMinutes = verification.checkNumber(readyInMinutes, 'readyInMinutes');
        if (sourceUrl) updatedRecipeData.sourceUrl = await backendVerification.checkURL(sourceUrl, 'sourceUrl');
        if (certified) updatedRecipeData.certified = verification.checkBoolean(certified, 'certified');
        // if (comments) {
        //     let updatedComments = updatedRecipeData.comments.push(comments);
        //     updatedRecipeData.comments = verification.checkStringArray(updatedRecipeData.comments, 'comments');
        // }
        let query = {_id : new ObjectId(id)};
        let updateCommand = {$set : updatedRecipeData};
        
        await recipeCollection.updateOne(query, updateCommand);

        return await this.getRecipeById(id);
    },

    async deleteRecipe(id){
        id = backendVerification.checkId(id, 'id');
        const recipeCollection = await recipes();
        let recipe = await this.getRecipeById(id);
        let recipeName = recipe.title;
        let deleted = recipeCollection.deleteOne({_id : new ObjectId(id)});
        if (deleted.deletedCount === 0) throw 'Could not delete recipe';
        return {recipeName, deleted : true};
    },

    async addComment(recipeId, userId, comment){
        recipeId = backendVerification.checkId(recipeId, 'recipeId');
        userId = backendVerification.checkId(userId, 'userId');
        comment = verification.checkString(comment, 'comment');
        const recipe = await this.getRecipeById(recipeId);
        const user = await usersData.getUserById(userId);
        let username = user.firstName + " " + user.lastName;
        if(user.showUsername){
            username = user.username;
        }

        let newComment = {
            userId : userId,
            username : username,
            comment : comment
        };
        recipe.comments.push(newComment);
        let query = {_id : new ObjectId(recipeId)};
        let updateCommand = {$set : recipe};
        let recipeCollection = await recipes();
        const updatedRecipe = await recipeCollection.updateOne(query, updateCommand);
        if(updatedRecipe.modifiedCount === 0) throw 'Could not add comment';
        return await this.getRecipeById(recipeId);
    },

    async updateComment(recipeId, userId, comment){
        recipeId = backendVerification.checkId(recipeId, 'recipeId');
        userId = backendVerification.checkId(userId, 'userId');
        comment = verification.checkString(comment, 'comment');
        const recipe = await this.getRecipeById(recipeId);
        const user = await usersData.getUserById(userId);
        let username = user.firstName + " " + user.lastName;
        if(user.showUsername){
            username = user.username;
        }

        let newComment = {
            userId : userId,
            username : username,
            comment : comment
        };
        for(let x of recipe.comments){
            if(x.userId === userId) x.comment = comment
        }
        let query = {_id : new ObjectId(recipeId)};
        let updateCommand = {$set : recipe};
        let recipeCollection = await recipes();
        const updatedRecipe = await recipeCollection.updateOne(query, updateCommand);
        if(updatedRecipe.modifiedCount === 0) throw 'Could not add comment';
        return await this.getRecipeById(recipeId);
    },

    async deleteComment(recipeId, commentId){
        recipeId = backendVerification.checkId(recipeId, 'recipeId');
        commentId = backendVerification.checkId(commentId, 'commentId');
        let recipe = await this.getRecipeById(recipeId);
        let recipeCollection = await recipes();
        let newComments = recipe.comments.filter(comment => comment._id == commentId);
        recipe.comments = newComments;
        let query = {_id : new ObjectId(recipeId)};
        let updateCommand = {$set : recipe};
        await recipeCollection.updateOne(query, updateCommand);
        return await this.getRecipeById(recipeId);
    },

    async likeRecipe(recipeId){
        recipeId = backendVerification.checkId(recipeId, 'recipeId');
        let recipe = await this.getRecipeById(recipeId);
        let recipeCollection = await recipes();
        recipe.likes++;
        let query = {_id : new ObjectId(recipeId)};
        let updateCommand = {$set : recipe};
        await recipeCollection.updateOne(query, updateCommand);
        return await this.getRecipeById(recipeId);
    },

    async dislikeRecipe(recipeId){
        recipeId = backendVerification.checkId(recipeId, 'recipeId');
        let recipe = await this.getRecipeById(recipeId);
        let recipeCollection = await recipes();
        recipe.likes--;
        let query = {_id : new ObjectId(recipeId)};
        let updateCommand = {$set : recipe};
        await recipeCollection.updateOne(query, updateCommand);
        return await this.getRecipeById(recipeId);
    },

    async getRecipesByFilter(userId, title, flavors, ingredients, readyInMinutes, likes, totalScore, minMatchPercentage, certified, userIngredients){
        let query = {};
        
        if(userId) query.userId = backendVerification.checkId(userId, 'userId');
        if(title) query.title = {$regex : verification.checkOnlyWordsString(title, 'title'), $options : 'i'};
        if(flavors) query.flavors = {$all : verification.checkOnlyWordsStringArray(flavors, 'flavors')};

        if (ingredients) {
            let ingredientNames = verification.checkOnlyWordsStringArray(ingredients, 'ingredients');   
            query.ingredients = {$elemMatch: {name: { $in: ingredientNames }}};
        } 

        if (userIngredients && minMatchPercentage) {
            let userIngredientsNames = verification.checkOnlyWordsStringArray(userIngredients.map(ingredient => ingredient.name.toLowerCase()), 'userIngredients');
            console.log(userIngredientsNames);

            const minMatchCount = minMatchPercentage / 100;
            console.log(minMatchCount);

            query.ingredients = {
                $elemMatch: { name: { $in: userIngredientsNames } }
            };
            query.$expr = { $gte: [{$divide : [{ $size: { $setIntersection: ['$ingredients.name', userIngredientsNames] } }, {$size : '$ingredients'}]}, minMatchCount] };
        }
        

        if(readyInMinutes) query.readyInMinutes = {$lte : verification.checkNumber(readyInMinutes, 'readyInMinutes')};
        if(likes) query.likes = {$gte : verification.checkNumber(likes, 'likes')};
        if(totalScore) query.dislikes = {$lte : verification.checkNumber(likes - totalScore, 'totalScore')};
        if(certified === true) query.certified = true;
        

        const recipeCollection = await recipes();
        const recipeList = await recipeCollection.find(query).toArray();

        return recipeList;
    }


}

export default recipesMethods;
