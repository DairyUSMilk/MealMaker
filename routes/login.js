import { usersData } from '../data/index.js';
import express from 'express';
import verification from '../public/js/verification.js';

const router = express.Router();

router.get('/', async (req, res) => {
    res.render('login');
}).post('/', async (req, res) => {
    let emailOrUserInput = req.body.emailOrUserInput;
    let passwordInput = req.body.passwordInput;

    if (!emailOrUserInput || !passwordInput) {
      return res.status(400).render('login', { title: 'Login', error: 'Both email address or username, and a password are required' });
    }

    try {
        // Error checking for username or email and password done in checkUser
        console.log("dbug1");
        const user = await usersData.checkUser(emailOrUserInput, passwordInput);
        console.log("dbug2");
        req.session.user = user;
        req.session.ingredients = user.ingredients;

        if (req.session.user.role === 'admin') {
            // TODO -- Should user be redirected anywhere, or should pages simply be rendered differently, and use different tag (middleware)
        } else {
            // TODO -- Where to redirect?
            res.redirect('/');
        }
    } catch (e) {
      res.status(500).render('login', { title: 'Login', error: `Failed to login: ${e}` });
    }
});

export default router;