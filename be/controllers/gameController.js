const {Game} = require('../models/gameModel');
const {InvalidRequestError} = require('../utils/customErrors');

const getGames = async (req, res) => {
  // const {userId} = req.user;
  // const offset = Number(req.query.offset) || 0;
  // const limit = Number(req.query.limit) || 0;
  // const count = await Note.find({userId}).countDocuments();
  const games = await Game.find({}, '-__v');

  if (!games) {
    throw new InvalidRequestError('No games found');
  }

  res.status(200).json({games});
};

const findGames = async (req, res) => {
  const {searchParam} = req.query;
  const findGames = await Game.find({title: {$regex: searchParam, $options: 'i'}}, '-__v -createdDate');

  if (!findGames) {
    throw new InvalidCredentialsError('No games found');
  }

  res.status(200).json({message: 'Success', findGames});
};

const getLibrary = async (req, res) => {
  const {userId} = req.user;
  const games = await Game.find({users: userId}, '-__v -createdDate');

  if (!games) {
    throw new InvalidCredentialsError('No games found');
  }

  res.status(200).json({games});
};

const addGame = async (req, res) => {
  const {userId} = req.user;
  const {gameId} = req.body;
  const game = await Game.findOne({_id: gameId});

  if (!game) {
    throw new InvalidCredentialsError('No game found');
  }
  await game.update({$addToSet: {users: userId}});

  res.status(200).json({message: 'Success'});
};

module.exports = {
  getGames,
  findGames,
  addGame,
  getLibrary,
};
