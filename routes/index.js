import ingredientsRoutes from "./ingredients.js";
import recipesRoutes from "./recipes.js";
import profileRoutes from "./profile.js";
import loginRoutes from "./login.js";
import registerRoutes from "./register.js";
import userMiddleware from "./middleware/userMiddlewares.js";
import recipesMiddleware from "./middleware/recipesMiddleware.js";
import redirectMiddleware from "./middleware/redirectMiddleware.js";
import isAdminMiddleware from "./middleware/isAdminMiddleware.js";

const constructorMethod = (app) => {
  
  app.get("/", (req, res) => {
    /* Render /home differently based on Guest, Community, Admin */
    res.render("home", { title: "Home", user: req.session.user });
  });

  app.use("/ingredients", ingredientsRoutes);
  // TODO
  //if logged in, uses the ingredients stored in the user document in database
  //if not logged in, uses the ingredients stored in the session
  //if no ingredients stored in session, show all recipes

  app.use("/recipes", recipesMiddleware, recipesRoutes);
  // TODO
  //if logged in, uses the ingredients stored in the user document in database
  //if not logged in, uses the ingredients stored in the session
  //if no ingredients stored in session, show all recipes

  app.use("/profile", userMiddleware, profileRoutes);
  // TODO
  //if logged in, uses the ingredients/recipes stored in the user document in database
  //if not logged in, uses the ingredients stored in the session
  //if no ingredients stored in session, show all recipes

  /* If user already logged in, redirect to /profile, with error stating you are already logged in */
  app.use("/register", redirectMiddleware, registerRoutes);

  /* If user already logged in, redirect to /profile, with error stating you are already logged in */
  /* User data is set/updated in session upon login (also when adding/removing ingredient, recipe, or liking/disliking recipe) */
  app.use("/login", redirectMiddleware, loginRoutes);

  /* If user already logged out, redirect to /login, with error stating you are already logged out */
  app.get("/logout", redirectMiddleware, (req, res) => {
    req.session.destroy();
    res.render("logout", { title: "Logout" });
  });

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route Not found" });
  });
};

export default constructorMethod;
