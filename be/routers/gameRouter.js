const express = require('express');
const router = new express.Router();
const {
  getGames,
  addGame,
  getLibrary,
  findGames,
} = require('../controllers/gameController');
const {asyncWrapper} = require('../utils/asyncWrapper');

router.get('/', asyncWrapper(getGames));
router.get('/library', asyncWrapper(getLibrary));
router.get('/findGames', asyncWrapper(findGames));
router.patch('/addGame', asyncWrapper(addGame));

module.exports = {
  gameRouter: router,
};
