import express from 'express';
const app = express();

import { randomBytes } from 'crypto';
import session from 'express-session';
import exphbs from 'express-handlebars';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import configRoutesFunction from './routes/index.js';
/* { Import Middleware Here } */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticDir = express.static(__dirname + '/public');

app.use('/public', staticDir);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({
    name: 'MealMakerAuthCookie',
    // secret: randomBytes(160, 36),
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    let userAuth = "(Non-Authenticated User)";
    if(req.session.user){
      userAuth = "(Authenticated User)"
    }
    console.log("" + new Date().toUTCString() +": " +  req.method + " " + req.originalUrl + " " + userAuth);
    next();
});

req.session.ingredients = [];

configRoutesFunction(app);

app.listen(3000, () => {
    console.log('MealMaker routes will be running on http://localhost:3000');
});