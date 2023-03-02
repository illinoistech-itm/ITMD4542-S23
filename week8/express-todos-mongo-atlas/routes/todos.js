var express = require('express');
var router = express.Router();
const todosController = require('../controllers/todoController');
const { body } = require('express-validator');

/* GET users listing. */
router.get('/', todosController.todos_list);

/* GET create todo form. */
router.get('/add', todosController.todos_create_get);

/* POST create todo. */
router.post('/add', 
  body('todoText').trim().notEmpty().withMessage('Todo text can not be empty!'), 
  body('todoEmail').trim().notEmpty().withMessage('Todo Email address can not be empty!')
    .isEmail().withMessage('Email must be a valid email address!'), 
  todosController.todos_create_post);

/* GET single todo. */
router.get('/:uuid', todosController.todos_detail);

/* GET delete todo form. */
router.get('/:uuid/delete', todosController.todos_delete_get);

/* POST delete todo. */
router.post('/:uuid/delete', todosController.todos_delete_post);

/* GET edit todo form. */
router.get('/:uuid/edit', todosController.todos_edit_get);

/* POST edit todo. */
router.post('/:uuid/edit', todosController.todos_edit_post);

module.exports = router;
