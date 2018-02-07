'use strict'

const mongoose = require('mongoose')

const Movie = mongoose.model('Movie', {
  name: String,
  description: String,
  poster: String,
  date: String
})

module.exports = Movie
