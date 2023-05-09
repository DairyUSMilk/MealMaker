const middleware = async(req, res, next) => {
    try{
        const recipe = await recipesData.getRecipeById(req.params.id);
        if(!req.session.user || req.session.user.role !== 'admin' || req.session.user._id !== recipe.userId){
            res.redirect('/recipes/${req.params.id}');
        }
    }catch(e){
        res.status(500).json({ error: e });
    }
    next();
}

export default middleware;