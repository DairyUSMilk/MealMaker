const middleware = async(req, res, next) => {
    if(req.session.user) {
        req.session.ingredients = req.session.user.ingredients;
        res.locals.user = req.session.user;
    }
    next();
}

export default middleware;