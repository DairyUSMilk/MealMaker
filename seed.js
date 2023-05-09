import {dbConnection, closeConnection} from './config/mongoConnection.js';
import { usersData, recipesData, ingredientsData } from './data/index.js';

const db = await dbConnection();
await db.dropDatabase();

const Milton = await usersData.createUser("Milton", "Zarzuela", "miltonz0628", "miltonz0628@gmail.com", 'Milton_Z0628', "admin", true);
const mid = Milton._id.toString();

const Trent = await usersData.createUser("Trent", "Zeller", "trentZ123", "TrentZ@gmail.com", "Password1.2", "admin", true);
const tid = Trent._id.toString();

const Darius = await usersData.createUser("Darius", "Truong", "Darius154", "DariusT@gmail.com", "Password1.2", "community", true);
const did = Darius._id.toString();

const Adam = await usersData.createUser("Adam", "Borowczak", "AdamB", "AdamB@gmail.com", "Password1.2", "community", true);
const aid = Adam._id.toString();


//function for adding ingredients to used in following recipes to DB

// async function populateIngredients(recipeIngredients) {
//   for (let i = 0; i < recipeIngredients.length; i++) {
//     const ingredient = recipeIngredients[i];
//     await ingredientsData.createIngredient(ingredient.name, ingredient.flavors, 0, "any");
//   }
// }

await ingredientsData.createIngredient("spaghetti", ["wheaty"], 0, "any");
await ingredientsData.createIngredient("ground beef", ["meaty", "salty"], 0, "any");
await ingredientsData.createIngredient("tomato sauce", ["savory", "tomato"], 0, "any");
await ingredientsData.createIngredient("romaine lettuce", ["bitter", "crunchy"], 0, "any");
await ingredientsData.createIngredient("croutons", ["garlicky"], 0, "any");
await ingredientsData.createIngredient("Parmesan Cheese", ["cheesy"], 0, "any");
await ingredientsData.createIngredient("ceasar dressing", ["sweet", "sour"], 0, "any");
await ingredientsData.createIngredient("fettuccine pasta", ["starchy", "pasta"], 0, "any");
await ingredientsData.createIngredient("salted butter", ["fat", "buttery", "salty"], 0, "any");
await ingredientsData.createIngredient("heavy cream", ["creamy", "rich"], 0, "any");
await ingredientsData.createIngredient("grated parmesan cheese", ["salty", "cheesy"], 0, "any");
await ingredientsData.createIngredient("garlic powder", ["spicy", "pungent"], 0, "any");
await ingredientsData.createIngredient("egg", ["eggy"], 0, "any");
await ingredientsData.createIngredient("creamy peanut butter", ["fat", "peanuty"], 0, "any");
await ingredientsData.createIngredient("sugar", ["sweet"], 0, "any");
await ingredientsData.createIngredient("medium red potatoes", ["potato"], 0, "any");
await ingredientsData.createIngredient("butter", ["fat", "buttery"], 0, "any");
await ingredientsData.createIngredient("parsley", ["parsley"], 0, "any");
await ingredientsData.createIngredient("bananas", ["banana"], 0, "any");
await ingredientsData.createIngredient("yellow cake mix", ["sweet"], 0, "any");
await ingredientsData.createIngredient("bacon strips", ["savory"], 0, "any");
await ingredientsData.createIngredient("frozen fully cooked breakfast sausage links", ["savory"], 0, "any");
await ingredientsData.createIngredient("brown sugar", ["sweet"], 0, "any");
await ingredientsData.createIngredient("toothpick", ["none"], 0, "any");
await ingredientsData.createIngredient("refrigerated crescent rolls", ["bready"], 1, "tube");
await ingredientsData.createIngredient("french-fried onions", ["savory"], 1.33, "cups");
await ingredientsData.createIngredient("egg", ["egg"], 1, "large");
await ingredientsData.createIngredient("water", [], 1, "tablespoon");
await ingredientsData.createIngredient("cream cheese", ["creamy"], 0, "any");
await ingredientsData.createIngredient("chicken breast", ["chicken"], 0, "any");
await ingredientsData.createIngredient("Buffalo wing sauce", ["spicy"], 0, "any");
await ingredientsData.createIngredient("ranch or blue cheese salad dressing", ["creamy"], 0, "any");
await ingredientsData.createIngredient("Colby-Monterey Jack cheese", ["cheese"], 0, "any");
await ingredientsData.createIngredient("potatoes", ["earthy"], 0, "any");
await ingredientsData.createIngredient("carrot", ["sweet"], 0, "any");
await ingredientsData.createIngredient("onion", ["pungent"], 0, "any");
await ingredientsData.createIngredient("parsley flakes", ["herbaceous"], 0, "any");
await ingredientsData.createIngredient("salt", ["salty"], 0, "any");
await ingredientsData.createIngredient("pepper", ["spicy"], 0, "any");
await ingredientsData.createIngredient("celery seed", ["herbaceous"], 0, "any");
await ingredientsData.createIngredient("chicken broth", ["salty"], 0, "any");
await ingredientsData.createIngredient("all purpose flour", ["neutral"], 0, "any");
await ingredientsData.createIngredient("milk", ["creamy"], 0, "any");
await ingredientsData.createIngredient("Velveeta", ["cheesy"], 0, "any");
await ingredientsData.createIngredient("green onions", ["pungent"], 0, "any");
await ingredientsData.createIngredient("onion powder", ["savory"], 0, "any");
await ingredientsData.createIngredient("kosher salt", ["savory"], 0, "any");
await ingredientsData.createIngredient("black pepper", ["savory"], 0, "any");
await ingredientsData.createIngredient("cheddar cheese", ["cheesy"], 0, "any");
await ingredientsData.createIngredient("mayonnaise", ["savory"], 0, "any");
await ingredientsData.createIngredient("ketchup", ["sweet", "savory"], 0, "any");
await ingredientsData.createIngredient("pickle juice", ["tangy", "savory"], 0, "any");
await ingredientsData.createIngredient("hot sauce", ["spicy"], 0, "any");
await ingredientsData.createIngredient("flour tortillas", ["bready"], 0, "any");
await ingredientsData.createIngredient("lettuce", ["leafy", "bitter"], 0, "any");
await ingredientsData.createIngredient("tomato", ["umami"], 0, "any");
await ingredientsData.createIngredient("pickles", ["tangy", "savory"], 0, "any");
await ingredientsData.createIngredient("ramen noodles", ["savory", "umami", "asian"], 0, "any");
await ingredientsData.createIngredient("cornstarch", [], 0, "any");
await ingredientsData.createIngredient("soy sauce", ["salty", "umami", "asian"], 0, "any");
await ingredientsData.createIngredient("rice vinegar", ["sour", "asian"], 0, "any");
await ingredientsData.createIngredient("hoisin sauce", ["sweet", "salty", "asian"], 0, "any");
await ingredientsData.createIngredient("ginger", ["spicy", "asian"], 0, "any");
await ingredientsData.createIngredient("garlic", ["spicy", "global"], 0, "any");
await ingredientsData.createIngredient("salt", [], 0, "any");
await ingredientsData.createIngredient("black pepper", ["spicy", "global"], 0, "any");
await ingredientsData.createIngredient("sesame oil", ["nutty", "asian"], 0, "any");
await ingredientsData.createIngredient("broccoli", ["vegetal", "global"], 0, "any");
await ingredientsData.createIngredient("sugar snap peas", ["vegetal", "global"], 0, "any");
await ingredientsData.createIngredient("carrot", ["sweet", "vegetal", "global"], 0, "any");
await ingredientsData.createIngredient("red bell pepper", ["sweet", "vegetal", "global"], 0, "any");
await ingredientsData.createIngredient("rotisserie chicken", ["savory", "american"], 0, "any");
await ingredientsData.createIngredient("colby-monterey jack cheese", ["cheese", "global"], 0, "any");
await ingredientsData.createIngredient("cheddar cheese", ["cheese", "global"], 0, "any");
await ingredientsData.createIngredient("celery", ["vegetable", "global"], 0, "any");
await ingredientsData.createIngredient("blue cheese salad dressing", ["savory", "cheesy", "global"], 0, "any");
await ingredientsData.createIngredient("Buffalo wing sauce", ["spicy", "global"], 0, "any");
await ingredientsData.createIngredient("flour tortillas", ["bready", "mexican"], 0, "any");
await ingredientsData.createIngredient("spaghetti", ["neutral"], 0, "any");
await ingredientsData.createIngredient("bacon", ["salty"], 0, "any");
await ingredientsData.createIngredient("ground beef", ["meaty"], 0, "any");
await ingredientsData.createIngredient("onion", ["savory"], 0, "any");
await ingredientsData.createIngredient("kidney beans", ["earthy"], 0, "any");
await ingredientsData.createIngredient("tomato sauce", ["savory"], 0, "any");
await ingredientsData.createIngredient("diced tomatoes and green chiles", ["spicy"], 0, "any");
await ingredientsData.createIngredient("chili powder", ["spicy"], 0, "any");
await ingredientsData.createIngredient("Worcestershire sauce", ["savory"], 0, "any");
await ingredientsData.createIngredient("ground cumin", ["spicy"], 0, "any");
await ingredientsData.createIngredient("dried oregano", ["herbaceous"], 0, "any");
await ingredientsData.createIngredient("garlic powder", ["savory"], 0, "any");
await ingredientsData.createIngredient("pepper jack cheese", ["spicy", "cheesy"], 0, "any");
await ingredientsData.createIngredient("condensed cream of chicken soup", ["savory"], 0, "any");
await ingredientsData.createIngredient("shredded cooked chicken", ["savory"], 0, "any");
await ingredientsData.createIngredient("cottage cheese", ["creamy"], 0, "any");
await ingredientsData.createIngredient("Ritz crackers", ["salty"], 0, "any");
await ingredientsData.createIngredient("sour cream", ["sour", "creamy"], 0, "any");






//#1
const SpaghettiBolognese = await recipesData.createRecipe(
tid,
"Spaghetti Bolognese",
["meaty", "savory", "tomato"],
"https://www.foodiefiasco.com/wp-content/uploads/2017/03/IMG_7230.jpg",
[
{
  id: 2001,
  name: "spaghetti",
  flavors: ["wheaty"],
  quantity: 1,
  measurement: "pound"
},
{
  id: 2002,
  name: "ground beef",
  flavors: ["meaty", "salty"],
  quantity: 1,
  measurement: "pound"
},
{
  id: 2003,
  name: "tomato sauce",
  flavors: ["savory", "tomato"],
  quantity: .5,
  measurement: "cup"
}
],
[
"In a large pot, bring salted water to a boil.",
"Add spaghetti and cook for 8 to 10 minutes or until al dente.",
"In a large skillet, brown the beef over medium heat.",
"Add the tomato sauce and stir.",
"Simmer for 10 minutes.",
"Serve over spaghetti."
],
1,
10,
"https://www.foodiefiasco.com/three-ingredient-pasta-bolognese-for-one/",
true
);

//#2
const CaesarSalad = await recipesData.createRecipe(
did,
"Caesar Salad",
["salty", "savory", "garlicky"],
"https://media.istockphoto.com/id/186841877/photo/caesar-salad.jpg?b=1&s=170667a&w=0&k=20&c=KoCb_IK8EmkH6KBt6LWujZM4j9WWMDEYjdTeM7ZaOhM=",
[
{
  id: 1234,
  name: "romaine lettuce",
  flavors: ["bitter", "crunchy"],
  quantity: 2,
  measurement: "whole"
},
{
  id: 3002,
  name: "croutons",
  flavors: ["garlicky"],
  quantity: 2,
  measurement: "cup"
},
{
  id: 3003,
  name: "Parmesan Cheese",
  flavors: ["cheesy"],
  quantity: 1,
  measurement: "cup"
},
{
id: 3004,
name: "ceasar dressing",
flavors: ["sweet", "sour"],
quantity: 1,
measurement: "cup"
}
],
[
"In a large bowl, whisk together garlic, lemon juice, and mustard.",
"Slowly whisk in olive oil to emulsify.",
"Add the romaine lettuce and toss to coat.",
"Top with croutons and Parmesan cheese."
],
4,
20,
"https://www.food.com/recipe/classic-caesar-salad-370618",
false
);

//#3
const FettuccineAlfredo = await recipesData.createRecipe(
did,
"Fettuccine Alfredo",
["creamy", "buttery"],
"https://img.freepik.com/free-photo/closeup-cooked-fettuccine-with-cream-spices-bowl-lights_181624-30653.jpg?size=626&ext=jpg&ga=GA1.1.2047840047.1683233762&semt=ais",
[
{
  id: 1053,
  name: "fettuccine pasta",
  flavors: ["starchy", "pasta"],
  quantity: 12,
  measurement: "ounce"
},
{
  id: 1001,
  name: "salted butter",
  flavors: ["fat", "buttery", "salty"],
  quantity: 1,
  measurement: "cup"
},
{
  id: 1123,
  name: "heavy cream",
  flavors: ["creamy", "rich"],
  quantity: 2,
  measurement: "cup"
},
{
  id: 1004,
  name: "grated parmesan cheese",
  flavors: ["salty", "cheesy"],
  quantity: 1,
  measurement: "cup"
},
{
  id: 1102047,
  name: "garlic powder",
  flavors: ["spicy", "pungent"],
  quantity: 1,
  measurement: "tsp"
}
],
[
"Bring a large pot of salted water to a boil.",
"Add the fettuccine and cook according to package instructions until al dente.",
"Meanwhile, in a large saucepan, melt the butter over medium heat.",
"Add the garlic powder and cook for 1 minute, stirring constantly.",
"Add the heavy cream and bring to a simmer.",
"Stir in the parmesan cheese until melted and smooth.",
"Drain the fettuccine and add it to the saucepan with the sauce.",
"Toss to coat the pasta in the sauce.",
"Serve immediately, garnished with additional parmesan cheese and freshly ground black pepper, if desired."
],
4,
25,
"https://lilluna.com/easy-fettuccine-alfredo/",
false
);

//#4
const PeanutButterCookies = await recipesData.createRecipe(
mid,
"Flourless Peanut Butter Cookies",
["savory", "peanuty"],
"https://www.tasteofhome.com/wp-content/uploads/2019/12/Healthy-Peanut-Butter-Cookies_EXPS_FT19_247269_F_1203_1-3.jpg?fit=300,300",
[
{
  id: 1053,
  name: "egg",
  flavors: ["eggy"],
  quantity: 1,
  measurement: "whole"
},
{
  id: 1001,
  name: "creamy peanut butter",
  flavors: ["fat", "peanuty"],
  quantity: 1,
  measurement: "cup"
},
{
  id: 1123,
  name: "sugar",
  flavors: ["sweet"],
  quantity: 1,
  measurement: "cup"
}
],
["Preheat oven to 350°. In a large bowl, mix all ingredients. Roll level tablespoons of dough into balls. Place on an ungreased baking sheet; flatten with a fork.",
"Bake until crisp, 12-15 minutes. Remove to a wire rack to cool."
],
4,
25,
"https://www.tasteofhome.com/recipes/flourless-peanut-butter-cookies/",
true
);

//6

const basicBoiledPotatoes = await recipesData.createRecipe(
tid,
"Basic Boiled Potatoes",
["water", "potatoey"],
"https://www.tasteofhome.com/wp-content/uploads/2018/01/Basic-Boiled-Potatoes_EXPS_FT21_15339_F_1109_1.jpg?fit=700,1024",
[
{
  id: 1053,
  name: "medium red potatoes",
  flavors: ["potato"],
  quantity: 5,
  measurement: "pound"
},
{
  id: 1001,
  name: "butter",
  flavors: ["fat","buttery"],
  quantity: 1,
  measurement: "cup"
},
{
  id: 1123,
  name: "parsley",
  flavors: ["parsley"],
  quantity: 1,
  measurement: "cup"
}
],
["Place potatoes in a Dutch oven or stockpot and cover with water. Cover and bring to a boil over medium-high heat; cook until tender, 15-30 minutes. Drain well. If desired, quarter eight potatoes and toss with butter and parsley. Refrigerate remaining potatoes."],
6,
30,
"https://www.tasteofhome.com/recipes/basic-boiled-potatoes/",
true
);

//7

const BananaBread = await recipesData.createRecipe(
tid,
"Banana bread",
["sweet", "bready"],
"https://www.tasteofhome.com/wp-content/uploads/2022/01/banana-bread-hero-1-scaled.jpg?resize=768,512",
[
{
  id: 1053,
  name: "bananas",
  flavors: ["banana"],
  quantity: 4,
  measurement: "whole"
},
{
  id: 1001,
  name: "yellow cake mix",
  flavors: ["sweet"],
  quantity: 15.25,
  measurement: "ounce"
},
{
  id: 1123,
  name: "egg",
  flavors: ["egg"],
  quantity: 2,
  measurement: "whole"
}
],
["Place potatoes in a Dutch oven or stockpot and cover with water. Cover and bring to a boil over medium-high heat; cook until tender, 15-30 minutes. Drain well. If desired, quarter eight potatoes and toss with butter and parsley. Refrigerate remaining potatoes."],
6,
30,
"https://www.tasteofhome.com/article/3-ingredient-banana-bread/",
true
);

//8


const SausageBaconBites = await recipesData.createRecipe(
aid,
"Air-Fryer Sausage Bacon Bites",
["savory"],
"https://www.tasteofhome.com/wp-content/uploads/2022/01/Air-Fryer-Sausage-Bacon-Bites_EXPS_TOHDJ23_267601_DR_07_19_7b.jpg?fit=700,1024",
[
{
  id: 1,
  name: "bacon strips",
  flavors: ["savory"],
  quantity: 0.75,
  measurement: "pound"
},
{
  id: 2,
  name: "frozen fully cooked breakfast sausage links",
  flavors: ["savory"],
  quantity: 16,
  measurement: "whole"
},
{
  id: 3,
  name: "brown sugar",
  flavors: ["sweet"],
  quantity: 0.5,
  measurement: "cup"
},
{
  id: 4,
  name: "toothpick",
  flavors: ["none"],
  quantity: 1,
  measurement: "whole"
}
],
[
"Cut bacon strips widthwise in half; cut sausage links in half. Wrap a piece of bacon around each piece of sausage. Place 1/2 cup brown sugar in a shallow bowl; roll sausages in sugar. Secure each with a toothpick. Place in a large bowl. Cover and refrigerate 4 hours or overnight.",
"Preheat air fryer to 325°. Sprinkle wrapped sausages with 1 tablespoon brown sugar. In batches, arrange sausages on a single layer in greased tray in air-fryer basket. Cook until bacon is crisp, 15-20 minutes, turning once. Sprinkle with remaining 1 tablespoon brown sugar."
],
4,
25,
"https://www.tasteofhome.com/recipes/air-fryer-sausage-bacon-bites/",
false
);


const OnionCrescentRolls = await recipesData.createRecipe(
mid,
"Air-Fryer Onion Crescent Rolls",
["savory"],
"https://www.tasteofhome.com/wp-content/uploads/2022/01/Onion-Crescent-Rolls_EXPS_HPLBZ18_28607_C05_17_3b_based-on.jpg?fit=700,1024",
[
{
  id: 1004,
  name: "refrigerated crescent rolls",
  flavors: ["bready"],
  quantity: 1,
  measurement: "tube"
},
{
  id: 1061,
  name: "french-fried onions",
  flavors: ["savory"],
  quantity: 1.33,
  measurement: "cups"
},
{
  id: 1123,
  name: "egg",
  flavors: ["egg"],
  quantity: 1,
  measurement: "large"
},
{
  id: 1009,
  name: "water",
  flavors: [],
  quantity: 1,
  measurement: "tablespoon"
}
],
[
"Do not preheat air fryer. Unroll crescent dough and separate into triangles. Sprinkle each with about 2 tablespoons onions. Roll up each from the wide end. Curve ends down to form crescents.",
"In batches, place crescents in a single layer on greased tray in air-fryer basket. Beat egg and water; brush over dough. Sprinkle with remaining onions. Cook at 325° until golden brown, 7-8 minutes. Serve warm."
],
4,
15,
"https://www.tasteofhome.com/recipes/air-fryer-onion-crescent-rolls/",
true
);

const BuffaloChickenDip = await recipesData.createRecipe(
aid,
"Buffalo Chicken Dip",
["spicy", "creamy"],
"https://www.tasteofhome.com/wp-content/uploads/2018/01/Buffalo-Chicken-Dip_EXPS_FT21_34952_F_0115_1-2.jpg?resize=522%2C522&w=680",
[
{
id: 1043,
name: "cream cheese",
flavors: ["creamy"],
quantity: 8,
measurement: "ounce",
},
{
id: 1056,
name: "chicken breast",
flavors: ["chicken"],
quantity: 1,
measurement: "cup",
},
{
id: 1021,
name: "Buffalo wing sauce",
flavors: ["spicy"],
quantity: 1 / 2,
measurement: "cup",
},
{
id: 1018,
name: "ranch or blue cheese salad dressing",
flavors: ["creamy"],
quantity: 1 / 2,
measurement: "cup",
},
{
id: 1028,
name: "Colby-Monterey Jack cheese",
flavors: ["cheese"],
quantity: 2,
measurement: "cup",
},
],
[
"Preheat oven to 350°. Spread cream cheese into an ungreased shallow 1-qt. baking dish. Layer with chicken, wing sauce and salad dressing. Sprinkle with cheese.",
"Bake, uncovered, until cheese is melted, 20-25 minutes. Serve with baguette slices.",
],
8,
30,
"https://www.tasteofhome.com/recipes/buffalo-chicken-dip/",
false
);

const PotatoSoup = await recipesData.createRecipe(
did,
"Potato Soup",
["savory", "hearty"],
"https://sugarspunrun.com/wp-content/uploads/2018/01/Potato-Soup-Recipe-1-of-1-5.jpg",
[
{
id: 1001,
name: "bacon strips",
flavors: ["salty"],
quantity: 6,
measurement: "whole"
},
{
id: 1003,
name: "potatoes",
flavors: ["earthy"],
quantity: 3,
measurement: "cup"
},
{
id: 1116,
name: "carrot",
flavors: ["sweet"],
quantity: 1,
measurement: "whole"
},
{
id: 1129,
name: "onion",
flavors: ["pungent"],
quantity: 0.5,
measurement: "cup"
},
{
id: 2014,
name: "parsley flakes",
flavors: ["herbaceous"],
quantity: 1,
measurement: "tablespoon"
},
{
id: 1009,
name: "salt",
flavors: ["salty"],
quantity: 0.5,
measurement: "teaspoon"
},
{
id: 1028,
name: "pepper",
flavors: ["spicy"],
quantity: 0.5,
measurement: "teaspoon"
},
{
id: 2015,
name: "celery seed",
flavors: ["herbaceous"],
quantity: 0.5,
measurement: "teaspoon"
},
{
id: 6194,
name: "chicken broth",
flavors: ["salty"],
quantity: 1,
measurement: "can (14-1/2 ounces)"
},
{
id: 20081,
name: "all purpose flour",
flavors: ["neutral"],
quantity: 3,
measurement: "tablespoon"
},
{
id: 1077,
name: "milk",
flavors: ["creamy"],
quantity: 3,
measurement: "cup"
},
{
id: 1188,
name: "Velveeta",
flavors: ["cheesy"],
quantity: 8,
measurement: "ounce"
},
{
id: 1129,
name: "green onions",
flavors: ["pungent"],
quantity: 2,
measurement: "whole"
}
],
["In a large saucepan, cook bacon over medium heat until crisp, stirring occasionally; drain drippings. Add vegetables, seasonings and broth; bring to a boil. Reduce heat; simmer, covered, until potatoes are tender, 10-15 minutes."
,"Mix flour and milk until smooth; stir into soup. Bring to a boil, stirring constantly; cook and stir until thickened, about 2 minutes. Stir in cheese until melted. If desired, serve with green onions."],
6,
60,
"https://www.tasteofhome.com/recipes/best-ever-potato-soup/",
false);

const cheeseburgerTacos = await recipesData.createRecipe(
tid,
"Cheeseburger Tacos",
["savory", "cheesy"],
"https://www.tasteofhome.com/wp-content/uploads/2023/04/Cheeseburger-Tacos_EXPS_TOHcom23_271839_P2_MD_02_16_3b.jpg?fit=700,1024",
[
{
id: 2001,
name: "ground beef",
flavors: ["savory"],
quantity: 1,
measurement: "pound"
},
{
id: 2023,
name: "onion powder",
flavors: ["savory"],
quantity: 1,
measurement: "teaspoon"
},
{
id: 2010,
name: "kosher salt",
flavors: ["savory"],
quantity: 0.5,
measurement: "teaspoon"
},
{
id: 2005,
name: "black pepper",
flavors: ["savory"],
quantity: 0.25,
measurement: "teaspoon"
},
{
id: 1020,
name: "cheddar cheese",
flavors: ["cheesy"],
quantity: 1,
measurement: "cup"
},
{
id: 1054,
name: "mayonnaise",
flavors: ["savory"],
quantity: 0.5,
measurement: "cup"
},
{
id: 1127,
name: "ketchup",
flavors: ["sweet", "savory"],
quantity: 0.25,
measurement: "cup"
},
{
id: 1189,
name: "pickle juice",
flavors: ["tangy", "savory"],
quantity: 2,
measurement: "teaspoon"
},
{
id: 1214,
name: "hot sauce",
flavors: ["spicy"],
quantity: 0.25,
measurement: "teaspoon"
},
{
id: 1253,
name: "flour tortillas",
flavors: ["bready"],
quantity: 8,
measurement: "whole"
},
{
id: 1122,
name: "lettuce",
flavors: ["leafy", "bitter"],
quantity: 1.25,
measurement: "cup"
},
{
id: 1061,
name: "tomato",
flavors: ["umami"],
quantity: 1,
measurement: "medium"
},
{
id: 1199,
name: "pickles",
flavors: ["tangy", "savory"],
quantity: 0.25,
measurement: "cup"
}
],
["In a large skillet, cook beef over medium heat, until no longer pink, 6-8 minutes, crumbling beef; drain. Stir in onion powder, salt and pepper. Sprinkle with cheese; cover and let stand until cheese is melted.",
"Meanwhile, in a small bowl, combine mayonnaise, ketchup, pickle juice and hot pepper sauce. Divide beef mixture between tortillas. Top with lettuce, tomato, pickles and sauce."],
8, 
65,
"https://www.tasteofhome.com/recipes/cheeseburger-tacos/",
true);

const RamenStirFry = await recipesData.createRecipe(
tid,
"Ramen Stir-Fry",
["savory", "umami"],
"https://www.tasteofhome.com/wp-content/uploads/2023/03/Ramen-Veggie-Stir-Fry_EXPS_FT23_273047_ST_3_10_1-2.jpg?fit=700,1024",
[
{
  id: 1001,
  name: "ramen noodles",
  flavors: ["savory", "umami"],
  quantity: 2,
  measurement: "package (3 oz)"
},
{
  id: 2001,
  name: "cornstarch",
  flavors: [],
  quantity: 2,
  measurement: "tsp"
},
{
  id: 2002,
  name: "soy sauce",
  flavors: ["salty", "umami"],
  quantity: 3,
  measurement: "tbsp"
},
{
  id: 2003,
  name: "rice vinegar",
  flavors: ["sour"],
  quantity: 2,
  measurement: "tbsp"
},
{
  id: 2004,
  name: "hoisin sauce",
  flavors: ["sweet", "salty"],
  quantity: 2,
  measurement: "tbsp"
},
{
  id: 1121,
  name: "ginger",
  flavors: ["spicy"],
  quantity: 1,
  measurement: "tsp minced"
},
{
  id: 1122,
  name: "garlic",
  flavors: ["spicy"],
  quantity: 1,
  measurement: "tsp minced"
},
{
  id: 5001,
  name: "salt",
  flavors: [],
  quantity: 0.25,
  measurement: "tsp"
},
{
  id: 5002,
  name: "black pepper",
  flavors: ["spicy"],
  quantity: 0.25,
  measurement: "tsp"
},
{
  id: 2005,
  name: "sesame oil",
  flavors: ["nutty"],
  quantity: 2,
  measurement: "tbsp"
},
{
  id: 1126,
  name: "broccoli",
  flavors: ["vegetal"],
  quantity: 1,
  measurement: "cup fresh florets"
},
{
  id: 1127,
  name: "sugar snap peas",
  flavors: ["vegetal"],
  quantity: 1,
  measurement: "cup"
},
{
  id: 1128,
  name: "carrot",
  flavors: ["sweet", "vegetal"],
  quantity: 1,
  measurement: "whole"
},
{
  id: 1129,
  name: "red bell pepper",
  flavors: ["sweet", "vegetal"],
  quantity: 1,
  measurement: "whole"
}],
["Discard ramen noodle seasoning packets or save for another use. Cook noodles according to package directions.",
"Meanwhile, in a small bowl, combine cornstarch, soy sauce, vinegar, hoisin sauce, ginger, garlic, salt and pepper until blended; set aside.",
"In a large skillet, heat oil over medium-high heat. Add vegetables; cook and stir until crisp-tender, 5-7 minutes.",
"Stir soy sauce mixture and add to pan. Bring to a boil; cook and stir until thickened, 1-2 minutes. Drain noodles; stir into vegetable mixture. If desired, garnish with sesame seeds and green onions."],
6, 
35,
"https://www.tasteofhome.com/recipes/ramen-stir-fry/",
true);

const BuffaloChickenWraps = await recipesData.createRecipe(
  tid,
  "Buffalo Chicken Crunch Wraps",
  ["spicy", "cheesy", "crunchy"],
  "https://www.tasteofhome.com/wp-content/uploads/2023/03/Buffalo-Chicken-Crunch-Wraps_EXPS_RC23_271143_DR_02_01_11b-2.jpg?fit=700,1024",
  [
      {
          id: 1001,
          name: "rotisserie chicken",
          flavors: ["savory"],
          quantity: 4,
          measurement: "cup"
      },
      {
          id: 1041,
          name: "colby-monterey jack cheese",
          flavors: ["cheese"],
          quantity: 1,
          measurement: "cup"
      },
      {
          id: 1040,
          name: "cheddar cheese",
          flavors: ["cheese"],
          quantity: 1,
          measurement: "cup"
      },
      {
          id: 1125,
          name: "celery",
          flavors: ["vegetable"],
          quantity: 0.67,
          measurement: "cup"
      },
      {
          id: 1501,
          name: "blue cheese salad dressing",
          flavors: ["savory", "cheesy"],
          quantity: 0.67,
          measurement: "cup"
      },
      {
          id: 1523,
          name: "Buffalo wing sauce",
          flavors: ["spicy"],
          quantity: 0.33,
          measurement: "cup"
      },
      {
          id: 2000,
          name: "flour tortillas",
          flavors: ["bready"],
          quantity: 6,
          measurement: "whole"
      }
  ],
  [
      "Preheat panini maker or indoor electric grill. In a large bowl, combine the first 6 ingredients. On center of each tortilla, divide chicken mixture.",
      "Fold one side of the tortilla over filling. Continue to bring the edges of the flour tortilla toward the center, pleating them on top of each other and covering all filling.",
      "In batches, place wraps on panini maker, seam side down. Cook wraps, covered, until tortilla is browned and cheese is melted, 6-8 minutes."
  ],
  4,
  25,
  "https://www.tasteofhome.com/recipes/buffalo-chicken-crunch-wraps/",
  true
);

const CowboySpaghetti = await recipesData.createRecipe(
  mid,
  "Cowboy Spaghetti",
  ["spicy", "meaty"],
  "https://www.tasteofhome.com/wp-content/uploads/2023/01/Cowboy-Spaghetti_EXPS_FT22_235784_ST_11_09_1.jpg?fit=700,1024",
  [
      {
          id: 2001,
          name: "spaghetti",
          flavors: ["neutral"],
          quantity: 12,
          measurement: "ounce"
      },
      {
          id: 1012,
          name: "bacon",
          flavors: ["salty"],
          quantity: 8,
          measurement: "slice"
      },
      {
          id: 1054,
          name: "ground beef",
          flavors: ["meaty"],
          quantity: 1.5,
          measurement: "pound"
      },
      {
          id: 1004,
          name: "onion",
          flavors: ["savory"],
          quantity: 1,
          measurement: "whole"
      },
      {
          id: 1021,
          name: "kidney beans",
          flavors: ["earthy"],
          quantity: 15,
          measurement: "ounce"
      },
      {
          id: 1023,
          name: "tomato sauce",
          flavors: ["savory"],
          quantity: 15,
          measurement: "ounce"
      },
      {
          id: 1032,
          name: "diced tomatoes and green chiles",
          flavors: ["spicy"],
          quantity: 10,
          measurement: "ounce"
      },
      {
          id: 2003,
          name: "chili powder",
          flavors: ["spicy"],
          quantity: 2,
          measurement: "tablespoon"
      },
      {
          id: 2050,
          name: "Worcestershire sauce",
          flavors: ["savory"],
          quantity: 2,
          measurement: "tablespoon"
      },
      {
          id: 2008,
          name: "ground cumin",
          flavors: ["spicy"],
          quantity: 1,
          measurement: "teaspoon"
      },
      {
          id: 2020,
          name: "dried oregano",
          flavors: ["herbaceous"],
          quantity: 1,
          measurement: "teaspoon"
      },
      {
          id: 2009,
          name: "garlic powder",
          flavors: ["savory"],
          quantity: 0.5,
          measurement: "teaspoon"
      },
      {
          id: 1003,
          name: "pepper jack cheese",
          flavors: ["spicy", "cheesy"],
          quantity: 3,
          measurement: "cup"
      }
  ],
  [
    "Preheat oven to 350°. Cook spaghetti according to package directions.",
    "In a 12-in. cast iron skillet, cook bacon over medium heat until crisp, stirring occasionally. Remove with a slotted spoon; drain on paper towels. Add beef and onion to drippings. Cook and stir until beef is no longer pink, 5-7 minutes, breaking meat into crumbles. Stir in tomato sauce, beans, diced tomatoes, chili powder, Worcestershire sauce, cumin, oregano and garlic powder.",
    "Drain spaghetti; stir into skillet. Stir in 1-1/2 cups cheese and half the bacon. Top with remaining 1-1/2 cups cheese. Bake until heated through, 20-25 minutes. Sprinkle with green onions and remaining bacon."
  ],
  7,
  45,
  "https://www.tasteofhome.com/recipes/cowboy-spaghetti/",
  true);

  const ChickenCasserole = await recipesData.createRecipe(
    did,
    "Chicken Casserole",
    ["creamy", "savory"],
    "https://www.tasteofhome.com/wp-content/uploads/2022/12/Million-Dollar-Chicken-Casserole_EXPS_FT22_271262_ST_11_11_1.jpg?resize=768,768",
    [
      {
        id: 1004,
        name: "cream cheese",
        flavors: ["creamy"],
        quantity: 4,
        measurement: "ounce"
      },
      {
        id: 1077,
        name: "sour cream",
        flavors: ["sour", "creamy"],
        quantity: 0.5,
        measurement: "cup"
      },
      {
        id: 1095,
        name: "condensed cream of chicken soup",
        flavors: ["savory"],
        quantity: 1,
        measurement: "can (10.5 oz)"
      },
      {
        id: 1129,
        name: "onion powder",
        flavors: ["savory"],
        quantity: 0.5,
        measurement: "teaspoon"
      },
      {
        id: 1026,
        name: "garlic powder",
        flavors: ["savory"],
        quantity: 0.5,
        measurement: "teaspoon"
      },
      {
        id: 5150,
        name: "shredded cooked chicken",
        flavors: ["savory"],
        quantity: 4,
        measurement: "cup"
      },
      {
        id: 1036,
        name: "cottage cheese",
        flavors: ["creamy"],
        quantity: 1,
        measurement: "cup"
      },
      {
        id: 18233,
        name: "Ritz crackers",
        flavors: ["salty"],
        quantity: 25,
        measurement: "whole"
      },
      {
        id: 1001,
        name: "butter",
        flavors: ["buttery"],
        quantity: 3,
        measurement: "tablespoon"
      },
      {
        id: 11291,
        name: "green onions",
        flavors: ["herbaceous"],
        quantity: 2,
        measurement: "whole"
      }
    ],
    [
      "Preheat oven to 350°.",
      "In a large bowl, beat cream cheese and sour cream until smooth. Beat in soup, onion powder and garlic powder.",
      "Stir in chicken and cottage cheese. Transfer to a greased 9-in. square baking dish.",
      "Combine crackers and butter; sprinkle over casserole.",
      "Bake, uncovered, until heated through, 25-30 minutes.",
      "Sprinkle with green onions."
    ],
    8,
    45,
    "https://www.tasteofhome.com/recipes/million-dollar-chicken-casserole/",
    false
  );
  


//Liking and adding Liked Recipes
await recipesData.likeRecipe(SpaghettiBolognese._id.toString());
await usersData.addRecipeToLikedRecipes("miltonz0628", SpaghettiBolognese._id.toString())

await recipesData.likeRecipe(cheeseburgerTacos._id.toString());
await usersData.addRecipeToLikedRecipes("miltonz0628", cheeseburgerTacos._id.toString())

await recipesData.likeRecipe(CaesarSalad._id.toString());
await usersData.addRecipeToLikedRecipes("trentZ123", CaesarSalad._id.toString())

await recipesData.likeRecipe(FettuccineAlfredo._id.toString());
await usersData.addRecipeToLikedRecipes("trentZ123", FettuccineAlfredo._id.toString())

await recipesData.likeRecipe(cheeseburgerTacos._id.toString());
await usersData.addRecipeToLikedRecipes("trentZ123", cheeseburgerTacos._id.toString())



await recipesData.likeRecipe(BuffaloChickenDip._id.toString());
await usersData.addRecipeToLikedRecipes("Darius154", BuffaloChickenDip._id.toString())

await recipesData.likeRecipe(BuffaloChickenWraps._id.toString());
await usersData.addRecipeToLikedRecipes("Darius154", BuffaloChickenWraps._id.toString())



await recipesData.likeRecipe(RamenStirFry._id.toString());
await usersData.addRecipeToLikedRecipes("AdamB", RamenStirFry._id.toString())

await recipesData.likeRecipe(PeanutButterCookies._id.toString());
await usersData.addRecipeToLikedRecipes("AdamB", PeanutButterCookies._id.toString())

await recipesData.likeRecipe(BananaBread._id.toString());
await usersData.addRecipeToLikedRecipes("AdamB", BananaBread._id.toString())


//Adding ingredients to users

const usersIngredients = {
  "miltonz0628": [
    "ground beef",
    "tomato sauce",
    "bananas",
    "yellow cake mix",
    "salt",
    "butter",
    "onion powder",
    "green onions"
  ],
  "trentZ123": [
    "pepper",
    "all purpose flour",
    "bananas",
    "romaine lettuce",
    "spaghetti",
    "ground beef",
    "onion",
    "bacon",
    "rotisserie chicken",
    "colby-monterey jack cheese"
  ],
  "Darius154": [
    "fettuccine pasta",
    "salted butter",
    "heavy cream",
    "grated parmesan cheese",
    "bacon strips",
    "brown sugar",
    "medium red potatoes",
    "toothpick",
    "water",
    "milk"
  ],
  "AdamB": [
    "romaine lettuce",
    "croutons",
    "Parmesan Cheese",
    "sugar",
    "parsley",
    "butter",
    "salted butter",
    "garlic powder",
    "egg",
    "creamy peanut butter"
  ]
};

for (const user in usersIngredients) {
  const ingredients = usersIngredients[user];
  for (const ingredientName of ingredients) {
    const ingredient = await ingredientsData.getIngredientByName(ingredientName);
    await usersData.addIngredientToUser(user, ingredient.id);
  }
}

// await populateIngredients(SpaghettiBolognese.ingredients)
// await populateIngredients(CaesarSalad.ingredients)
// await populateIngredients(FettuccineAlfredo.ingredients)
// await populateIngredients(PeanutButterCookies.ingredients)
// await populateIngredients(basicBoiledPotatoes.ingredients)
// await populateIngredients(BananaBread.ingredients)
// await populateIngredients(SausageBaconBites.ingredients)
// await populateIngredients(OnionCrescentRolls.ingredients)
// await populateIngredients(BuffaloChickenDip.ingredients)
// await populateIngredients(PotatoSoup.ingredients)
// await populateIngredients(cheeseburgerTacos.ingredients)
// await populateIngredients(RamenStirFry.ingredients)
// await populateIngredients(BuffaloChickenWraps.ingredients)
// await populateIngredients(CowboySpaghetti.ingredients)
// await populateIngredients(ChickenCasserole.ingredients)


console.log('Done seeding database');
await closeConnection();
