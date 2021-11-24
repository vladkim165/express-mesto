const router = require('express').Router();
const {
  getUser,
  getCurrentUser,
  getAllUsers,
  editProfile,
  editProfileAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.get('/:id', getUser);
router.patch('/me', editProfile);
router.patch('/me/avatar', editProfileAvatar);

module.exports = router;
