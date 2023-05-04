import { usersData } from '../data/index.js';
import express from 'express';
import verification from '../public/js/verification.js';

const router = express.Router();

router.get('/', async (req, res) => {
    // TODO -- Might need to use AJAX here to not do a full page render
    // Load all ingredients and recipes from db here
    const recipes = await usersData.checkUser(emailOrUserInput, passwordInput);
          req.session.user = user;
          req.session.ingredients = user.ingredients;
    // Save them into session
    res.render("profile", { title: "Profile" });
});

// Profile displays:
// Full Name
// Username
// Whether or not username can be displayed
// Role
// User's ingredients (from db)
// User's liked recipes

export default router;