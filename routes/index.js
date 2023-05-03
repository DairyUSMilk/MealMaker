import ingredientsRoutes from './ingredients.js';
import recipesRoutes from './recipes.js';
import usersRoutes from './users.js';
import loginRoutes from './login.js';

const constructorMethod = (app) => {
    // TODO
    app.get('/', (req, res) => {
      res.render('home', { title: 'Home' });
    });

    app.use('/ingredients', ingredientsRoutes);
    app.use('/recipes', recipesRoutes);
    app.use('/users', usersRoutes);
    app.use('/login', loginRoutes);
    app.get('/logout', (req, res) => {
      req.session.destroy();
      res.render('logout', { title: 'Logout' })
    });
    // app.use('/users', usersRoutes);
    //might want to have /login be login, not /users/login

    app.use('*', (req, res) => {
      res.status(404).json({ error: 'Route Not found' });
    });
};

export default constructorMethod;