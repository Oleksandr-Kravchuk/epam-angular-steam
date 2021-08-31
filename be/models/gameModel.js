const mongoose = require('mongoose');

const Game = mongoose.model('Game', {
  price: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  users: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
    }],
  },
});

module.exports = {
  Game,
};
