const express = require('express');
const { registerUser, loginUser, getUsers, updateUser, deleteUser, getUserByID } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', protect, getUsers);
router.get('/user/:id', protect, getUserByID);
router.put('/user/:id', protect, updateUser);
router.delete('/user/:id', protect, deleteUser);

module.exports = router;
