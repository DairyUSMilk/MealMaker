import { usersData } from '../data/index.js';
import express from 'express';
import verification from '../public/js/verification.js';

router = express.Router();

router.get('/', async (req, res) => {
    res.render('login');
    //res.render
}).post(async (req, res) => {
    const { emailOrUserInput, passwordInput } = req.body;

    if (!emailOrUserInput || !passwordInput) {
      return res.status(400).render('login', { title: 'Login', error: 'Both email address or username, and a password are required' });
    }

    emailOrUserInput = emailOrUserInput.trim();
    passwordInput = passwordInput.trim();

    try {
        // Error checking for username or email and password done in checkUser
        const user = await usersData.checkUser(emailOrUserInput, passwordInput);
        
        req.session.user = {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.userName,
            emailAddress: user.email,
            role: user.role,
            showUsername: user.showUsername
            // TODO -- Not sure whether other user information should be stored in session
        };

        if (user.role === 'admin') {
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