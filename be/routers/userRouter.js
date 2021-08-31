const express = require('express');
const router = new express.Router();
const {
  getFriends,
  getUser,
  addFriend,
  findUsers,
  removeFriend,
  // deleteUser,
  changeUserProfile,
} = require('../controllers/userController');
const {asyncWrapper} = require('../utils/asyncWrapper');

router.get('/', asyncWrapper(getFriends));
router.get('/findUsers', asyncWrapper(findUsers));
router.get('/me', asyncWrapper(getUser));
router.patch('/me/addFriend', asyncWrapper(addFriend));
router.patch('/me/removeFriend', asyncWrapper(removeFriend));
router.patch('/me', asyncWrapper(changeUserProfile));

module.exports = {
  userRouter: router,
};
