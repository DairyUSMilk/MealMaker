const middleware = async(req, res, next) => {
    if(!req.session.user) {
        return res.status(401).render('login', {title: 'Login', error: `You must be logged in to access ${req.originalUrl}`});
    }
    next();
}

export default middleware;