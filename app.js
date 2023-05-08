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

Handlebars.registerHelper('eq', function(a, b) {
    return a === b;
});

app.use('/public', staticDir);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    saveUninitialized: false,
    ingredients : []
}));

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