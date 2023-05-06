import {dbConnection, closeConnection} from './config/mongoConnection.js';
import ingredientMethods from './data/ingredients.js';
import recipeMethods from './data/recipes.js';
import userMethods from './data/users.js';

const db = await dbConnection();
await db.dropDatabase();

const Milton = await userMethods.createUser("Milton", "Zarzuela", "miltonz0628", "miltonz0628@gmail.com", 'Milton_Z0628', "admin", true);
const mid = Milton._id.toString();

const Trent = await userMethods.createUser("Trent", "Zeller", "trentZ123", "TrentZ@gmail.com", "Password1.2", "admin", true);
const tid = Trent._id.toString();

const Darius = await userMethods.createUser("Darius", "Truong", "Darius154", "DariusT@gmail.com", "Password1.2", "admin", true);
const did = Darius._id.toString();

const Adam = await userMethods.createUser("Adam", "Borowczak", "AdamB", "AdamB@gmail.com", "Password1.2", "admin", true);
const aid = Adam._id.toString();

// #1
const SpaghettiBolognese = await recipeMethods.createRecipe(
tid,
"Spaghetti Bolognese",
["meaty", "savory", "tomato"],
"https://cdn.pixabay.com/photo/2019/10/13/14/23/spaghetti-bolognese-4546233_960_720.jpg",
[
{
  id: 2001,
  name: "spaghetti",
  flavors: ["wheaty"],
  generalCuisine: ["italian"],
  quantity: 1,
  measurement: "pound"
},
{
  id: 2002,
  name: "ground beef",
  flavors: ["meaty", "salty"],
  generalCuisine: ["american"],
  quantity: 1,
  measurement: "pound"
},
{
  id: 2003,
  name: "tomato sauce",
  flavors: ["savory", "tomato"],
  generalCuisine: ["italian"],
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
const CaesarSalad = await recipeMethods.createRecipe(
did,
"Caesar Salad",
["salty", "savory", "garlicky"],
"https://media.istockphoto.com/id/186841877/photo/caesar-salad.jpg?b=1&s=170667a&w=0&k=20&c=KoCb_IK8EmkH6KBt6LWujZM4j9WWMDEYjdTeM7ZaOhM=",
[
{
  id: 3001,
  name: "romaine lettuce",
  flavors: ["bitter", "crunchy"],
  generalCuisine: ["american"],
  quantity: 2,
  measurement: "whole"
},
{
  id: 3002,
  name: "croutons",
  flavors: ["garlicky"],
  generalCuisine: ["american"],
  quantity: 2,
  measurement: "cup"
},
{
  id: 3003,
  name: "Parmesan Cheese",
  flavors: ["cheesy"],
  generalCuisine: ["italian"],
  quantity: 1,
  measurement: "cup"
},
{
id: 3004,
name: "ceasar dressing",
flavors: ["sweet, sour"],
generalCuisine: ["american"],
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
"https://www.food.com/recipe/classic-caesar-salad-587935",
true
);

//#3
const FettuccineAlfredo = await recipeMethods.createRecipe(
did,
"Fettuccine Alfredo",
["creamy", "buttery"],
"https://img.freepik.com/free-photo/closeup-cooked-fettuccine-with-cream-spices-bowl-lights_181624-30653.jpg?size=626&ext=jpg&ga=GA1.1.2047840047.1683233762&semt=ais",
[
{
  id: 1053,
  name: "fettuccine pasta",
  flavors: ["starchy", "pasta"],
  generalCuisine: ["italian"],
  quantity: 12,
  measurement: "ounce"
},
{
  id: 1001,
  name: "salted butter",
  flavors: ["fat", "buttery", "salty"],
  generalCuisine: ["savory"],
  quantity: 1,
  measurement: "cup"
},
{
  id: 1123,
  name: "heavy cream",
  flavors: ["creamy", "rich"],
  generalCuisine: ["dessert"],
  quantity: 2,
  measurement: "cup"
},
{
  id: 1004,
  name: "grated parmesan cheese",
  flavors: ["salty", "cheesy"],
  generalCuisine: ["italian"],
  quantity: 1,
  measurement: "cup"
},
{
  id: 1102047,
  name: "garlic powder",
  flavors: ["spicy", "pungent"],
  generalCuisine: ["savory"],
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
true
);

//#4
const PeanutButterCookies = await recipeMethods.createRecipe(
mid,
"Flourless Peanut Butter Cookies",
["savory", "peanuty"],
"https://www.tasteofhome.com/wp-content/uploads/2019/12/Healthy-Peanut-Butter-Cookies_EXPS_FT19_247269_F_1203_1-3.jpg?fit=300,300",
[
{
  id: 1053,
  name: "egg",
  flavors: ["eggy"],
  generalCuisine: ["global"],
  quantity: 1,
  measurement: "whole"
},
{
  id: 1001,
  name: "creamy peanut butter",
  flavors: ["fat", "peanuty"],
  generalCuisine: ["global"],
  quantity: 1,
  measurement: "cup"
},
{
  id: 1123,
  name: "sugar",
  flavors: ["sweet"],
  generalCuisine: ["global"],
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

const basicBoiledPotatoes = await recipeMethods.createRecipe(
tid,
"Basic Boiled Potatoes",
["water", "potatoey"],
"https://www.tasteofhome.com/wp-content/uploads/2018/01/Basic-Boiled-Potatoes_EXPS_FT21_15339_F_1109_1.jpg?fit=700,1024",
[
{
  id: 1053,
  name: "medium red potatoes",
  flavors: ["potato"],
  generalCuisine: ["global"],
  quantity: 5,
  measurement: "pound"
},
{
  id: 1001,
  name: "butter",
  flavors: ["fat","buttery"],
  generalCuisine: ["global"],
  quantity: 1,
  measurement: "cup"
},
{
  id: 1123,
  name: "parsley",
  flavors: ["parsley"],
  generalCuisine: ["global"],
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

const BananaBread = await recipeMethods.createRecipe(
tid,
"Banana bread",
["sweet", "bready"],
"https://www.tasteofhome.com/wp-content/uploads/2022/01/banana-bread-hero-1-scaled.jpg?resize=768,512",
[
{
  id: 1053,
  name: "bananas",
  flavors: ["banana"],
  generalCuisine: ["global"],
  quantity: 4,
  measurement: "whole"
},
{
  id: 1001,
  name: "yellow cake mix",
  flavors: ["sweet"],
  generalCuisine: ["american"],
  quantity: 15.25,
  measurement: "ounce"
},
{
  id: 1123,
  name: "egg",
  flavors: ["egg"],
  generalCuisine: ["global"],
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


const SausageBaconBites = await recipeMethods.createRecipe(
aid,
"Air-Fryer Sausage Bacon Bites",
["savory"],
"https://www.tasteofhome.com/wp-content/uploads/2022/01/Air-Fryer-Sausage-Bacon-Bites_EXPS_TOHDJ23_267601_DR_07_19_7b.jpg?fit=700,1024",
[
{
  id: 1,
  name: "bacon strips",
  flavors: ["savory"],
  generalCuisine: ["global"],
  quantity: 0.75,
  measurement: "pound"
},
{
  id: 2,
  name: "frozen fully cooked breakfast sausage links",
  flavors: ["savory"],
  generalCuisine: ["global"],
  quantity: 16,
  measurement: "whole"
},
{
  id: 3,
  name: "brown sugar",
  flavors: ["sweet"],
  generalCuisine: ["global"],
  quantity: 0.5,
  measurement: "cup"
},
{
  id: 4,
  name: "toothpick",
  flavors: ["none"],
  generalCuisine: ["none"],
  quantity: null,
  measurement: null
}
],
[
"Cut bacon strips widthwise in half; cut sausage links in half. Wrap a piece of bacon around each piece of sausage. Place 1/2 cup brown sugar in a shallow bowl; roll sausages in sugar. Secure each with a toothpick. Place in a large bowl. Cover and refrigerate 4 hours or overnight.",
"Preheat air fryer to 325°. Sprinkle wrapped sausages with 1 tablespoon brown sugar. In batches, arrange sausages on a single layer in greased tray in air-fryer basket. Cook until bacon is crisp, 15-20 minutes, turning once. Sprinkle with remaining 1 tablespoon brown sugar."
],
4,
25,
"https://www.tasteofhome.com/recipes/air-fryer-sausage-bacon-bites/",
true
);


const OnionCrescentRolls = await recipeMethods.createRecipe(
mid,
"Air-Fryer Onion Crescent Rolls",
["savory"],
"https://www.tasteofhome.com/wp-content/uploads/2022/01/Onion-Crescent-Rolls_EXPS_HPLBZ18_28607_C05_17_3b_based-on.jpg?fit=700,1024",
[
{
  id: 1004,
  name: "refrigerated crescent rolls",
  flavors: ["bready"],
  generalCuisine: ["global"],
  quantity: 1,
  measurement: "tube"
},
{
  id: 1061,
  name: "french-fried onions",
  flavors: ["savory"],
  generalCuisine: ["global"],
  quantity: 1.33,
  measurement: "cups"
},
{
  id: 1123,
  name: "egg",
  flavors: ["egg"],
  generalCuisine: ["global"],
  quantity: 1,
  measurement: "large"
},
{
  id: 1009,
  name: "water",
  flavors: [],
  generalCuisine: ["global"],
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

const BuffaloChickenDip = await recipeMethods.createRecipe(
aid,
"Buffalo Chicken Dip",
["spicy", "creamy"],
"https://www.tasteofhome.com/wp-content/uploads/2018/01/Buffalo-Chicken-Dip_EXPS_FT21_34952_F_0115_1-2.jpg?resize=522%2C522&w=680",
[
{
id: 1043,
name: "cream cheese",
flavors: ["creamy"],
generalCuisine: ["global"],
quantity: 8,
measurement: "ounce",
},
{
id: 1056,
name: "chicken breast",
flavors: ["chicken"],
generalCuisine: ["global"],
quantity: 1,
measurement: "cup",
},
{
id: 1021,
name: "Buffalo wing sauce",
flavors: ["spicy"],
generalCuisine: ["american"],
quantity: 1 / 2,
measurement: "cup",
},
{
id: 1018,
name: "ranch or blue cheese salad dressing",
flavors: ["creamy"],
generalCuisine: ["global"],
quantity: 1 / 2,
measurement: "cup",
},
{
id: 1028,
name: "Colby-Monterey Jack cheese",
flavors: ["cheese"],
generalCuisine: ["global"],
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
true
);

const PotatoSoup = await recipeMethods.createRecipe(
did,
"Potato Soup",
["savory", "hearty"],
"data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20568%20568'%3E%3C/svg%3E",
[
{
id: 1001,
name: "bacon strips",
flavors: ["salty"],
generalCuisine: ["american"],
quantity: 6,
measurement: "whole"
},
{
id: 1003,
name: "potatoes",
flavors: ["earthy"],
generalCuisine: ["global"],
quantity: 3,
measurement: "cup"
},
{
id: 1116,
name: "carrot",
flavors: ["sweet"],
generalCuisine: ["global"],
quantity: 1,
measurement: "whole"
},
{
id: 1129,
name: "onion",
flavors: ["pungent"],
generalCuisine: ["global"],
quantity: 0.5,
measurement: "cup"
},
{
id: 2014,
name: "parsley flakes",
flavors: ["herbaceous"],
generalCuisine: ["global"],
quantity: 1,
measurement: "tablespoon"
},
{
id: 1009,
name: "salt",
flavors: ["salty"],
generalCuisine: ["global"],
quantity: 0.5,
measurement: "teaspoon"
},
{
id: 1028,
name: "pepper",
flavors: ["spicy"],
generalCuisine: ["global"],
quantity: 0.5,
measurement: "teaspoon"
},
{
id: 2015,
name: "celery seed",
flavors: ["herbaceous"],
generalCuisine: ["global"],
quantity: 0.5,
measurement: "teaspoon"
},
{
id: 6194,
name: "chicken broth",
flavors: ["salty"],
generalCuisine: ["global"],
quantity: 1,
measurement: "can (14-1/2 ounces)"
},
{
id: 20081,
name: "all-purpose flour",
flavors: ["neutral"],
generalCuisine: ["global"],
quantity: 3,
measurement: "tablespoon"
},
{
id: 1077,
name: "2% milk",
flavors: ["creamy"],
generalCuisine: ["global"],
quantity: 3,
measurement: "cup"
},
{
id: 1188,
name: "Velveeta",
flavors: ["cheesy"],
generalCuisine: ["global"],
quantity: 8,
measurement: "ounce"
},
{
id: 1129,
name: "green onions",
flavors: ["pungent"],
generalCuisine: ["global"],
quantity: 2,
measurement: "whole"
}
],
["In a large saucepan, cook bacon over medium heat until crisp, stirring occasionally; drain drippings. Add vegetables, seasonings and broth; bring to a boil. Reduce heat; simmer, covered, until potatoes are tender, 10-15 minutes."
,"Mix flour and milk until smooth; stir into soup. Bring to a boil, stirring constantly; cook and stir until thickened, about 2 minutes. Stir in cheese until melted. If desired, serve with green onions."],
6,
60,
"https://www.tasteofhome.com/recipes/best-ever-potato-soup/",
true);

const cheeseburgerTacos = await recipeMethods.createRecipe(
tid,
"Cheeseburger Tacos",
["savory", "cheesy"],
"https://www.tasteofhome.com/wp-content/uploads/2023/04/Cheeseburger-Tacos_EXPS_TOHcom23_271839_P2_MD_02_16_3b.jpg?fit=700,1024",
[
{
id: 2001,
name: "ground beef",
flavors: ["savory"],
generalCuisine: ["american"],
quantity: 1,
measurement: "pound"
},
{
id: 2023,
name: "onion powder",
flavors: ["savory"],
generalCuisine: ["global"],
quantity: 1,
measurement: "teaspoon"
},
{
id: 2010,
name: "kosher salt",
flavors: ["savory"],
generalCuisine: ["global"],
quantity: 0.5,
measurement: "teaspoon"
},
{
id: 2005,
name: "black pepper",
flavors: ["savory"],
generalCuisine: ["global"],
quantity: 0.25,
measurement: "teaspoon"
},
{
id: 1020,
name: "cheddar cheese",
flavors: ["cheesy"],
generalCuisine: ["global"],
quantity: 1,
measurement: "cup"
},
{
id: 1054,
name: "mayonnaise",
flavors: ["savory"],
generalCuisine: ["global"],
quantity: 0.5,
measurement: "cup"
},
{
id: 1127,
name: "ketchup",
flavors: ["sweet", "savory"],
generalCuisine: ["global"],
quantity: 0.25,
measurement: "cup"
},
{
id: 1189,
name: "pickle juice",
flavors: ["tangy", "savory"],
generalCuisine: ["global"],
quantity: 2,
measurement: "teaspoon"
},
{
id: 1214,
name: "hot sauce",
flavors: ["spicy"],
generalCuisine: ["global"],
quantity: 0.25,
measurement: "teaspoon"
},
{
id: 1253,
name: "flour tortillas",
flavors: ["bready"],
generalCuisine: ["mexican"],
quantity: 8,
measurement: "whole"
},
{
id: 1122,
name: "lettuce",
flavors: ["leafy", "bitter"],
generalCuisine: ["global"],
quantity: 1.25,
measurement: "cup"
},
{
id: 1061,
name: "tomato",
flavors: ["umami"],
generalCuisine: ["global"],
quantity: 1,
measurement: "medium"
},
{
id: 1199,
name: "pickles",
flavors: ["tangy", "savory"],
generalCuisine: ["global"],
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

const RamenStirFry = await recipeMethods.createRecipe(
tid,
"Ramen Stir-Fry",
["savory", "umami"],
"https://www.tasteofhome.com/wp-content/uploads/2023/03/Ramen-Veggie-Stir-Fry_EXPS_FT23_273047_ST_3_10_1-2.jpg?fit=700,1024",
[
{
  id: 1001,
  name: "ramen noodles",
  flavors: ["savory", "umami"],
  generalCuisine: ["asian"],
  quantity: 2,
  measurement: "package (3 oz)"
},
{
  id: 2001,
  name: "cornstarch",
  flavors: [],
  generalCuisine: [],
  quantity: 2,
  measurement: "tsp"
},
{
  id: 2002,
  name: "soy sauce",
  flavors: ["salty", "umami"],
  generalCuisine: ["asian"],
  quantity: 3,
  measurement: "tbsp"
},
{
  id: 2003,
  name: "rice vinegar",
  flavors: ["sour"],
  generalCuisine: ["asian"],
  quantity: 2,
  measurement: "tbsp"
},
{
  id: 2004,
  name: "hoisin sauce",
  flavors: ["sweet", "salty"],
  generalCuisine: ["asian"],
  quantity: 2,
  measurement: "tbsp"
},
{
  id: 1121,
  name: "ginger",
  flavors: ["spicy"],
  generalCuisine: ["asian"],
  quantity: 1,
  measurement: "tsp minced"
},
{
  id: 1122,
  name: "garlic",
  flavors: ["spicy"],
  generalCuisine: ["global"],
  quantity: 1,
  measurement: "tsp minced"
},
{
  id: 5001,
  name: "salt",
  flavors: [],
  generalCuisine: [],
  quantity: 0.25,
  measurement: "tsp"
},
{
  id: 5002,
  name: "black pepper",
  flavors: ["spicy"],
  generalCuisine: ["global"],
  quantity: 0.25,
  measurement: "tsp"
},
{
  id: 2005,
  name: "sesame oil",
  flavors: ["nutty"],
  generalCuisine: ["asian"],
  quantity: 2,
  measurement: "tbsp"
},
{
  id: 1126,
  name: "broccoli",
  flavors: ["vegetal"],
  generalCuisine: ["global"],
  quantity: 1,
  measurement: "cup fresh florets"
},
{
  id: 1127,
  name: "sugar snap peas",
  flavors: ["vegetal"],
  generalCuisine: ["global"],
  quantity: 1,
  measurement: "cup"
},
{
  id: 1128,
  name: "carrot",
  flavors: ["sweet", "vegetal"],
  generalCuisine: ["global"],
  quantity: 1,
  measurement: "whole"
},
{
  id: 1129,
  name: "red bell pepper",
  flavors: ["sweet", "vegetal"],
  generalCuisine: ["global"],
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

const BuffaloChickenWraps = await recipeMethods.createRecipe(
  tid,
  "Buffalo Chicken Crunch Wraps",
  ["spicy", "cheesy", "crunchy"],
  "https://www.tasteofhome.com/wp-content/uploads/2023/03/Buffalo-Chicken-Crunch-Wraps_EXPS_RC23_271143_DR_02_01_11b-2.jpg?fit=700,1024",
  [
      {
          id: 1001,
          name: "rotisserie chicken",
          flavors: ["savory"],
          generalCuisine: ["american"],
          quantity: 4,
          measurement: "cup"
      },
      {
          id: 1041,
          name: "colby-monterey jack cheese",
          flavors: ["cheese"],
          generalCuisine: ["global"],
          quantity: 1,
          measurement: "cup"
      },
      {
          id: 1040,
          name: "cheddar cheese",
          flavors: ["cheese"],
          generalCuisine: ["global"],
          quantity: 1,
          measurement: "cup"
      },
      {
          id: 1125,
          name: "celery",
          flavors: ["vegetable"],
          generalCuisine: ["global"],
          quantity: 0.67,
          measurement: "cup"
      },
      {
          id: 1501,
          name: "blue cheese salad dressing",
          flavors: ["savory", "cheesy"],
          generalCuisine: ["global"],
          quantity: 0.67,
          measurement: "cup"
      },
      {
          id: 1523,
          name: "Buffalo wing sauce",
          flavors: ["spicy"],
          generalCuisine: ["global"],
          quantity: 0.33,
          measurement: "cup"
      },
      {
          id: 2000,
          name: "flour tortillas",
          flavors: ["bready"],
          generalCuisine: ["mexican"],
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

const CowboySpaghetti = await recipeMethods.createRecipe(
  mid,
  "Cowboy Spaghetti",
  ["spicy", "meaty"],
  "https://www.tasteofhome.com/wp-content/uploads/2023/01/Cowboy-Spaghetti_EXPS_FT22_235784_ST_11_09_1.jpg?fit=700,1024",
  [
      {
          id: 2001,
          name: "spaghetti",
          flavors: ["neutral"],
          generalCuisine: ["italian"],
          quantity: 12,
          measurement: "ounce"
      },
      {
          id: 1012,
          name: "bacon",
          flavors: ["salty"],
          generalCuisine: ["global"],
          quantity: 8,
          measurement: "slice"
      },
      {
          id: 1054,
          name: "ground beef",
          flavors: ["meaty"],
          generalCuisine: ["global"],
          quantity: 1.5,
          measurement: "pound"
      },
      {
          id: 1004,
          name: "onion",
          flavors: ["savory"],
          generalCuisine: ["global"],
          quantity: 1,
          measurement: "whole"
      },
      {
          id: 1021,
          name: "kidney beans",
          flavors: ["earthy"],
          generalCuisine: ["global"],
          quantity: 15,
          measurement: "ounce"
      },
      {
          id: 1023,
          name: "tomato sauce",
          flavors: ["savory"],
          generalCuisine: ["global"],
          quantity: 15,
          measurement: "ounce"
      },
      {
          id: 1032,
          name: "diced tomatoes and green chiles",
          flavors: ["spicy"],
          generalCuisine: ["global"],
          quantity: 10,
          measurement: "ounce"
      },
      {
          id: 2003,
          name: "chili powder",
          flavors: ["spicy"],
          generalCuisine: ["global"],
          quantity: 2,
          measurement: "tablespoon"
      },
      {
          id: 2050,
          name: "Worcestershire sauce",
          flavors: ["savory"],
          generalCuisine: ["global"],
          quantity: 2,
          measurement: "tablespoon"
      },
      {
          id: 2008,
          name: "ground cumin",
          flavors: ["spicy"],
          generalCuisine: ["global"],
          quantity: 1,
          measurement: "teaspoon"
      },
      {
          id: 2020,
          name: "dried oregano",
          flavors: ["herbaceous"],
          generalCuisine: ["global"],
          quantity: 1,
          measurement: "teaspoon"
      },
      {
          id: 2009,
          name: "garlic powder",
          flavors: ["savory"],
          generalCuisine: ["global"],
          quantity: 0.5,
          measurement: "teaspoon"
      },
      {
          id: 1003,
          name: "pepper jack cheese",
          flavors: ["spicy", "cheesy"],
          generalCuisine: ["global"],
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

  const ChickenCasserole = await recipeMethods.createRecipe(
    did,
    "Chicken Casserole",
    ["creamy", "savory"],
    "https://www.tasteofhome.com/wp-content/uploads/2022/12/Million-Dollar-Chicken-Casserole_EXPS_FT22_271262_ST_11_11_1.jpg?resize=768,768",
    [
      {
        id: 1004,
        name: "cream cheese",
        flavors: ["creamy"],
        generalCuisine: ["global"],
        quantity: 4,
        measurement: "ounce"
      },
      {
        id: 1077,
        name: "sour cream",
        flavors: ["sour", "creamy"],
        generalCuisine: ["global"],
        quantity: 0.5,
        measurement: "cup"
      },
      {
        id: 1095,
        name: "condensed cream of chicken soup",
        flavors: ["savory"],
        generalCuisine: ["american"],
        quantity: 1,
        measurement: "can (10.5 oz)"
      },
      {
        id: 1129,
        name: "onion powder",
        flavors: ["savory"],
        generalCuisine: ["global"],
        quantity: 0.5,
        measurement: "teaspoon"
      },
      {
        id: 1026,
        name: "garlic powder",
        flavors: ["savory"],
        generalCuisine: ["global"],
        quantity: 0.5,
        measurement: "teaspoon"
      },
      {
        id: 5150,
        name: "shredded cooked chicken",
        flavors: ["savory"],
        generalCuisine: ["global"],
        quantity: 4,
        measurement: "cup"
      },
      {
        id: 1036,
        name: "cottage cheese",
        flavors: ["creamy"],
        generalCuisine: ["global"],
        quantity: 1,
        measurement: "cup"
      },
      {
        id: 18233,
        name: "Ritz crackers",
        flavors: ["salty"],
        generalCuisine: ["global"],
        quantity: 25,
        measurement: "whole"
      },
      {
        id: 1001,
        name: "butter",
        flavors: ["buttery"],
        generalCuisine: ["global"],
        quantity: 3,
        measurement: "tablespoon"
      },
      {
        id: 11291,
        name: "green onions",
        flavors: ["herbaceous"],
        generalCuisine: ["global"],
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
    true
  );
  

console.log('Done seeding database');
await closeConnection();