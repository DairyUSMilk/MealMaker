import { usersData } from '../data/index.js';
import express from 'express';
import verification from '../public/js/verification.js';

const router = express.Router();

router.get('/register', async (req, res) => {
    res.render('register', { title: 'Register' });
}).post(async (req, res) => {
    const { firstNameInput, lastNameInput, usernameInput, emailAddressInput, passwordInput, confirmPasswordInput, showUsernameInput } = req.body;
    let missingFields = [];

    if (!firstNameInput) missingFields.push('First Name');
    if (!lastNameInput) missingFields.push('Last Name');
    if (!usernameInput) missingFields.push('Username');
    if (!emailAddressInput) missingFields.push('Email Address');
    if (!passwordInput) missingFields.push('Password');
    if (!confirmPasswordInput) missingFields.push('Confirm Password');

    if (missingFields.length > 0) return res.status(400).render('register', { title: 'Register', error: `Missing fields: ${missingFields.join(', ')}` });

    firstNameInput = firstNameInput.trim();
    lastNameInput = lastNameInput.trim();
    usernameInput = usernameInput.trim();
    emailAddressInput = emailAddressInput.trim();
    passwordInput = passwordInput.trim();
    confirmPasswordInput = confirmPasswordInput.trim();
  
    try {
        verification.checkName(firstNameInput);
        verification.checkName(lastNameInput);
        verification.checkUsername(usernameInput);
        verification.checkEmail(emailAddressInput);
        verification.checkPassword(passwordInput);
        verification.checkPasswordMatch(passwordInput, confirmPasswordInput);
    } catch (e) {
        res.status(400).render('register', { title: 'Register', error: e });
    }
  
    try {
        // TODO -- For now, default user as admin (not sure how we will allow users to become admin yet)
      const newUser = await usersData.createUser(firstNameInput, lastNameInput, usernameInput, emailAddressInput, passwordInput, 'community', showUsernameInput);
      if (newUser.insertedUser) {
        return res.redirect('/login');
      } else {
        return res.status(500).render('register', { title: 'Register', error: 'Failed to create user. Please try again' });
      }
    } catch (e) {
        res.status(500).render('register', { title: 'Register', error: `${e}` });
    }
});

router.get('/login', async (req, res) => {
    res.render('login');
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
        }
    } catch (e) {
      res.status(500).render('login', { title: 'Login', error: `Failed to login: ${e}` });
    }
});

router.route('/logout').get(async (req, res) => {
  req.session.destroy();
  res.render('logout', { title: 'Logout' })
});

export default router;