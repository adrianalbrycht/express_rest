const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');

router.get('/', postController.getAll);

router.get('/:id', postController.get);

router.post('/', postController.create);

router.patch('/:id', postController.update);

router.delete('/:id', postController.delete);

router.delete('/', postController.deleteInBatch);


module.exports = router;



