import {recipes} from './recipes.js';
import verification from '../public/js/verification.js';

export const createRecipe = async (
    userId,
    title,
    flavors,
    imageURL,
    ingredients,
    instructions,
    servings,
    readyInMinutes,
    sourceUrl
)=>{
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
}