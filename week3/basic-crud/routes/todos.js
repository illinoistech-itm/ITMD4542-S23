var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('todos', { title: 'Express Todos from pug template!!!' });
});

module.exports = router;
