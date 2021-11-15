const router = require('express').Router()
const { createUser, getUser, getAllUsers, editProfile, editProfileAvatar } = require('../controllers/users')

router.post('/', createUser)
router.get('/:id', getUser)
router.get('/', getAllUsers)
router.patch('/me', editProfile)
router.patch('/me/avatar', editProfileAvatar)

module.exports = router