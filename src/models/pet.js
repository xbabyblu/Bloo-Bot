const mongoose = require('mongoose');

const { PET_PAT_EXP } = require('../BLOO_GLOBALS');
const xp = require('../util/magicformula');

const { Schema } = mongoose;

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    default: 1,
  },
  experience: {
    type: Number,
    required: true,
    default: 0,
  },
  // unused
  species: {
    type: String,
    required: true,
    default: '---'
  },
  image: {
    type: Buffer,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  pats: {
    count: { type: Number, default: 0 },
    time: { type: Date, default: new Date('1970-01-01') },
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  }
});

petSchema.pre('save', function preSave(next) {
  if (this.isModified('createdAt')) {
    throw new Error('Creation field is read only!');
  } else {
    next();
  }
});

petSchema.pre('save', function preSave(next) {
  this.updatedAt = Date.now();
  next();
});

petSchema.methods.givePat = async function givePat() {
  this.pats.count += 1;
  this.pats.time = Date.now();
  this.experience += PET_PAT_EXP;

  while (xp.expToNextLevel(this.level) < this.experience) {
    this.experience -= xp.expToNextLevel(this.level);
    this.level += 1;
  }

  return this.save();
}

petSchema.methods.giveExp = async function giveExp(amount) {
  this.experience += amount;

  while (xp.expToNextLevel(this.level) < this.experience) {
    this.experience -= xp.expToNextLevel(this.level);
    this.level += 1;
  }

  return this.save();
}

module.exports = mongoose.model('Pet', petSchema);
