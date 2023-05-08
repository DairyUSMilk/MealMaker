import {ingredients} from '../config/mongoCollections.js'
import verification from '../public/js/verification.js';
import backendVerification from '../public/js/backendVerification.js';
import {ObjectId} from 'mongodb';

const ingredientsMethods = {
    async createIngredient(
        name,
        flavors,//includes generalCuisine specifications
        quantity,
        measurement,
    ){
        name = verification.checkOnlyWordsString(name, 'name');
        flavors = verification.checkOnlyWordsStringArray(flavors, 'flavors');
        quantity = verification.checkNumber(quantity, 'quantity');
        measurement = verification.checkOnlyWordsString(measurement, 'measurement');
        //need to check if measurement is a valid measurement but we'll do that later
        //when displaying database, quantity and measurement should be 0 and "Any" respectively
        const ingredient = {
            name : name,
            flavors : flavors,
            quantity : quantity,
            measurement : measurement,
        };

        let ingredientCollection = await ingredients();
        let insertInfo = await ingredientCollection.insertOne(ingredient);
        if (insertInfo.insertedCount === 0) throw 'Could not add ingredient';
        let newId = insertInfo.insertedId;
        const newIngredient = await this.getIngredientById(newId.toString());
        return newIngredient;
    },

    async getIngredientById(id){
        id = backendVerification.checkId(id, 'id');
        const ingredientCollection = await ingredients();
        let ingredient = await ingredientCollection.findOne({"_id" : new ObjectId(id)});
        if (ingredient === null) throw 'No ingredient with that id';
        return ingredient;
    },

    async getAllIngredients(){
        const ingredientCollection = await ingredients();
        const ingredientList = await ingredientCollection.find({}).toArray();
        return ingredientList;
    },

    async getAllIngredientsIdAndName(){
        const ingredientCollection = await ingredients();
        const ingredientList = await ingredientCollection.find({}, {name: 1, _id: 1}).toArray();
        return ingredientList;
    },

    async updateIngredient(
        id,
        name,
        flavors,//includes generalCuisine specifications
        quantity,
        measurement,
    ){
        id = backendVerification.checkId(id, 'id');
        name = verification.checkOnlyWordsString(name, 'name');
        flavors = verification.checkOnlyWordsStringArray(flavors, 'flavors');
        quantity = verification.checkNumber(quantity, 'quantity');
        measurement = verification.checkOnlyWordsString(measurement, 'measurement');
        //need to check if measurement is a valid measurement but we'll do that later

        //need to add a check for the url
        const ingredientCollection = await ingredients();
        const query = {_id : id};
        const updateCommand = {
            $set : {
                name : name,
                flavors : flavors,
                quantity : quantity,
                measurement : measurement
            }
        };
        const updateInfo = await ingredientCollection.updateOne(query, updateCommand);
        if (updateInfo.modifiedCount === 0) throw 'Could not update ingredient';
        return await this.getIngredientById(id);
    },

    async deleteIngredient(id){
        id = backendVerification.checkId(id, 'id');
        const ingredientCollection = await ingredients();
        const ingredient = await this.getIngredientById(id);
        const ingredientName = ingredient.name;
        const deleted = await ingredientCollection.deleteOne({_id : id});
        if (deleted.deletedCount === 0) throw 'Could not delete ingredient';
        return {ingredientName, deleted : true};
    },

    async checkIngredientArray(ingredients) {   //for recipe and user to check validity of ingredients
        const ingredientCollection = await ingredients();
        const ingredientList = await ingredientCollection.find({}, {name: 1}).toArray();
        const ingredientNames = ingredientList.map(ingredient => ingredient.name);
      
        let notInDB = [];
        for (let ingredient of ingredients) {
          if (!ingredientNames.includes(ingredient)) {
            notInDB.push(ingredient);
          }
        }

        return notInDB;
    },

    async getIngredientByName(ingredientName) {   //for recipe and user to check validity of ingredients
        const ingredientCollection = await ingredients();
        let ingredient = await ingredientCollection.findOne({name: ingredientName});
        
        return ingredient;
    },

    async addFlavorsToIngredient(ingredientName, flavors) {
        const ingredientCollection = await ingredients();
        const ingredient = await ingredientCollection.findOne({name: ingredientName});
        const ingredientFlavors = ingredient.flavors;
        let newFlavors = [...new Set(ingredientFlavors.concat(flavors))];   //remove duplicates
        const query = {name: ingredientName};
        const updateCommand = {
            $set : {
                flavors : newFlavors,
            }
        };
        const updateInfo = await ingredientCollection.updateOne(query, updateCommand);
        if (updateInfo.modifiedCount === 0) throw 'Could not update ingredient';
        return await this.getIngredientByName(ingredientName);
    }

}

export default ingredientsMethods;