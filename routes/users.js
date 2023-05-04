import { usersData } from '../data/index.js';
import express from 'express';
import verification from '../public/js/verification.js';

const router = express.Router();

router.get('/ingredients', async (req, res) => {
  //should be a middleware here to check if user is logged in
  //TODO -- render display of user's ingredients
});

// Profile displays:
// Full Name
// Username
// Whether or not username can be displayed
// Role
// User's ingredients (from db)
// User's liked recipes

// Functionality to add
// Delete recipe - can delete any recipe from any page that contains recipes if logged in as admin
// Unlike recipe - can unlike any recipe from any page that contains recipes if logged in as community

export default router;