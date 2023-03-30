const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    console.log(req.session);
    console.log(req.authInfo);
    res.render('users', { title: 'User Info', user: JSON.stringify(req.session.passport.user, null, 2) });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
