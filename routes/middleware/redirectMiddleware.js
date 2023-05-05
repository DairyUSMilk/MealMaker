const middleware = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/profile');
    } else {
        return next()
    }
}

export default middleware;