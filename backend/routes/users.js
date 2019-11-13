const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');
const auth = require('../middleware/auth');

router.get('/', userCtrl.getUsers);
router.get('/:id', auth, userCtrl.getUserById);
router.post('/', userCtrl.createUser);
router.post('/signin', userCtrl.signin);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;