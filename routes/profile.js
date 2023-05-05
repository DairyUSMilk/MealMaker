import { usersData } from '../data/index.js';
import express from 'express';
import verification from '../public/js/verification.js';

const router = express.Router();

router.get('/', async (req, res) => {
    /* Loading from database unecessary here */
    /* User data is set/updated in session upon login (also when adding/removing ingredient, recipe, or liking/disliking recipe) */
    if (req.session.user) {
        res.render("profile", { title: "Profile", user: req.session.user });   
    }
});

export default router;