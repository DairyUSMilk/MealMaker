const isAdminMiddleware = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
      next();
    } else {
      return res.status(403).render('error', { title: 'Error', error: 'Only admin accounts have permission to view this page', layout: false});
    }
};
  
export default isAdminMiddleware;