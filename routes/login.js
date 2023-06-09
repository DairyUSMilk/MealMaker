import { usersData } from '../data/index.js';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    res.status(200).render('login', { title: 'Login' });
}).post('/', async (req, res) => {
    let emailOrUserInput = req.body.emailOrUserInput;
    let passwordInput = req.body.passwordInput;

    if (!emailOrUserInput || !passwordInput) {
      return res.status(400).render('login', { title: 'Login', error: 'Both email address or username, and a password are required' });
    }

    try {
        const user = await usersData.checkUser(emailOrUserInput, passwordInput);
        req.session.user = user;
        req.session.ingredients = user.ingredients;

        /* Redirect to /recipes whether admin or community */
        res.status(200).redirect('/recipes');
    } catch (e) {
      res.status(500).render('login', { title: 'Login', error: `Failed to login: ${e}` });
    }
});

export default router;