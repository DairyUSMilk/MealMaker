const redirectMiddleware = (req, res, next) => {
    const originalUrl = req.originalUrl;
  
    if (req.session.user) {
      if (originalUrl === "/register" || originalUrl === "/login") {
        res.status(403).render("profile", { title: "Profile", user: req.session.user, error: "You are already logged in" });   
      } else {
        return next();
      }
    } else {
      if (originalUrl === "/logout") {
        res.status(403).render("login", { title: "Login", user: req.session.user, error: "You are already logged out" });   
      } else {
        return next();
      }
    }
  };
  
  export default redirectMiddleware;