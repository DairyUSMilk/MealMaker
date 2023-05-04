import ingredientsRoutes from "./ingredients.js";
import recipesRoutes from "./recipes.js";
import usersRoutes from "./users.js";
import loginRoutes from "./login.js";
import registerRoutes from "./register.js";
import userMiddleware from "./middleware/userMiddlewares.js"

const constructorMethod = (app) => {
  
  app.get("/", (req, res) => {
    /*
      home should look different for each type of user
      we can either make multiple home pages, or have one 
      home page that renders differently based on user type
      */
    res.render("home", { title: "Home" });
  });

  app.use("/ingredients", ingredientsRoutes);

  app.use("/recipes", recipesRoutes);
  //if logged in, uses the ingredients stored in the user document in database
  //if not logged in, uses the ingredients stored in the session
  //if no ingredients stored in session, show all recipes

  app.use("/profile", userMiddleware, usersRoutes);
  // redirects to /login if not logged in

  app.use("/user", userMiddleware, usersRoutes);
  //redirects to /login if not logged in

  app.use("/register", registerRoutes);
  //middleware here to check if user is logged in
  //if so, redirect to home page

  app.use("/login", loginRoutes);
  //might want to have /login be login, not /users/login

  app.get("/logout", (req, res) => {
    req.session.destroy();
    res.render("logout", { title: "Logout" });
  });

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route Not found" });
  });
};

export default constructorMethod;
