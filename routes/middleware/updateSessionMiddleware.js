import { usersData } from '../../data/index.js'

const updateSessionData = async (req, res, next) => {
  if (req.session && req.session.user) {
    const userData = await usersData.getUserById(req.session.user._id);
    req.session.user = userData;
  }
  next();
};

export default updateSessionData;