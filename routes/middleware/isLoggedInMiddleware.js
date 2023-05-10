const isLoggedInMiddleware = (req, res, next) => {
    if (!req.session.user) {
      return res.status(403).render("login", { title: "Login", error: "You must be logged in to perform this action" });
    }
    return next();
};  

export default isLoggedInMiddleware;