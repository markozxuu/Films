import mongoose from 'mongoose'

const Movie = mongoose.model('Movie', {
  name: String,
  description: String,
  poster: String,
  date: String
})

export default Movie
