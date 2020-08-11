const mongoose = require('mongoose');

const heroSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Hero = mongoose.model('hero', heroSchema);
module.exports = Hero;