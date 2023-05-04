const middleware = async(req, res, next) => {
    if(req.session.user) {
        req.session.ingredients = req.session.user.ingredients;
    }
    next();
}

export default middleware;