import ingredientsRoutes from './ingredients.js';
import recipesRoutes from './recipes.js';
import usersRoutes from './users.js';

const constructorMethod = (app) => {
    // TODO

    app.use('*', (req, res) => {
      res.status(404).json({ error: 'Route Not found' });
    });
};

export default constructorMethod;