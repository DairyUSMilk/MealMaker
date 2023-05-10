import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    /* Loading from database unecessary here */
    /* User data is set/updated in session upon login (also when adding/removing ingredient, recipe, or liking/disliking recipe) */
    if (req.session.user) {
        res.status(200).render("profile", { title: "Profile", user: req.session.user });   
    }
});

export default router;