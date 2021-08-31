const {User} = require('../models/userModel');
const {InvalidCredentialsError} = require('../utils/customErrors');

const getFriends = async (req, res) => {
  const {userId} = req.user;
  const users = await User.find({friendsId: userId}, '-__v -password -createdDate');

  if (!users) {
    throw new InvalidCredentialsError('No user found');
  }

  res.status(200).json({users});
};

const getUser = async (req, res) => {
  const {userId} = req.user;
  const user = await User.findOne({_id: userId}, '-__v -password -createdDate');

  if (!user) {
    throw new InvalidCredentialsError('No user found');
  }

  res.status(200).json({user});
};

const addFriend = async (req, res) => {
  const {userId} = req.user;
  const {friendId} = req.body;
  const user = await User.findOne({_id: userId});
  const friend = await User.findOne({_id: friendId});

  if (!user) {
    throw new InvalidCredentialsError('No user found');
  }
  await friend.update({$addToSet: {friendsId: userId}});
  await user.update({$addToSet: {friendsId: friendId}});

  res.status(200).json({message: 'Success'});
};

const findUsers = async (req, res) => {
  const {userId} = req.user;
  const {searchParam} = req.query;
  const allUsers = await User.find({email: {$regex: searchParam, $options: 'i'}}, '-__v -password -createdDate');

  const findUsers = allUsers.filter((item) => userId !== item._id.toString());

  if (!findUsers) {
    throw new InvalidCredentialsError('No users found');
  }

  res.status(200).json({message: 'Success', findUsers});
};

const removeFriend = async (req, res) => {
  const {userId} = req.user;
  const {friendId} = req.body;
  const user = await User.findOne({_id: userId});
  const friend = await User.findOne({_id: friendId});

  if (!user) {
    throw new InvalidCredentialsError('No user or friend found');
  }
  await friend.update({$pull: {friendsId: userId}});
  await user.update({$pull: {friendsId: friendId}});

  res.status(200).json({message: 'Success'});
};

const changeUserProfile = async (req, res) => {
  const {userId} = req.user;
  const {email, age, username} = req.body;
  const user = await User.findOne({_id: userId});

  if (!user) {
    throw new InvalidCredentialsError('No user found');
  }

  user.email = email;
  user.age = age;
  user.username = username;
  await user.save();

  res.status(200).json({message: 'Success'});
};

module.exports = {
  getFriends,
  getUser,
  addFriend,
  findUsers,
  removeFriend,
  changeUserProfile,
};
