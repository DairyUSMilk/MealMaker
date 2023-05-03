import { usersData } from '../data/index.js';
import express from 'express';
import verification from '../public/js/verification.js';

const router = express.Router();

router.get('/ingredients', async (req, res) => {
  //should be a middleware here to check if user is logged in
  //TODO -- render display of user's ingredients
});

//profile
//delete recipe -- based on role
//unlike recipe



//moved login to different js folder, moved logout to index.js

export default router;