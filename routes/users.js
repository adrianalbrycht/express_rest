const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/', userController.getAll);
router.get('/:id', userController.get);

router.post('/register', userController.create);
router.post('/login', userController.login);

router.patch('/:id', userController.update);

router.delete('/:id', userController.delete);

router.delete('/', userController.deleteInBatch);

module.exports = router;
