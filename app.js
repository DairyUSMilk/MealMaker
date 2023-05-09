import express from 'express';
const app = express();

import session from 'express-session';
import exphbs from 'express-handlebars';
import Handlebars from 'handlebars';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

import configRoutesFunction from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticDir = express.static(path.join(__dirname, '/public'));
const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    // If the user posts to the server with a property called _method, rewrite the request's method
    // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
    // rewritten in this middleware to a PUT route
    if (req.body && req.body._method) {
      req.method = req.body._method;
      delete req.body._method;
    }
  
    // let the next middleware run:
    next();
};

Handlebars.registerHelper('eq', function(a, b) {
    return a === b;
});

Handlebars.registerHelper("userHasLiked", (recipeId, likedRecipes) => {
    const isLiked = likedRecipes.some((likedRecipe) => {
      return likedRecipe._id.toString() === recipeId.toString();
    });
  
    return isLiked;
});

app.use('/public', staticDir);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);

app.engine('handlebars', exphbs.engine({ 
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, '/views/partials')
}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(session({
    name: 'MealMakerAuthCookie',
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    if(!req.session.ingredients) req.session.ingredients = [];
    next();
});

app.use((req, res, next) => {
    let userAuth = "(Non-Authenticated User)";
    if(req.session.user){
      userAuth = "(Authenticated User)"
    }
    console.log("" + new Date().toUTCString() +": " +  req.method + " " + req.originalUrl + " " + userAuth);
    next();
});


configRoutesFunction(app);

app.listen(3000, () => {
    console.log('MealMaker routes will be running on http://localhost:3000');
});