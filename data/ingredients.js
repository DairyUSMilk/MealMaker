import {ingredients} from '../config/mongoCollections.js'
import verification from '../public/js/verification.js';

export const ingredientMethods = {
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
        const newIngredient = await this.getIngredientById(newId);
        return newIngredient;
    },

    async getIngredientById(id){
        id = verification.checkId(id, 'id');
        const ingredientCollection = await ingredients();
        const ingredient = await ingredientCollection.findOne({_id : id});
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
        id = verification.checkId(id, 'id');
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
        id = verification.checkId(id, 'id');
        const ingredientCollection = await ingredients();
        const ingredient = await this.getIngredientById(id);
        const ingredientName = ingredient.name;
        const deleted = await ingredientCollection.deleteOne({_id : id});
        if (deleted.deletedCount === 0) throw 'Could not delete ingredient';
        return {ingredientName, deleted : true};
    }

}

export default ingredientMethods;