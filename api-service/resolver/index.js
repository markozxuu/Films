export default {
  Query: {
    allFilms: async (_, args, { Movie }) => {
      const films = await Movie.find()
      return films.map(x => {
        x._id = x._id.toString()
        return x
      })
    },
    getMovie: async (_, args, { Movie }) => {
      const movie = await Movie.findById(args.id)
      return movie
    }
  },
  Mutation: {
    movieAdd: async (_, args, { Movie }) => {
      console.log(args)
      const movie = await new Movie(args.movie).save()
      movie._id = movie._id.toString()
      return movie
    },
    movieEdit: async (_, args, { Movie }) => {
      const movie = await Movie.findByIdAndUpdate(args.movieId, args.movie)
      return movie
    },
    movieDelete: async (_, args, { Movie }) => {
      const movieDelete = await Movie.findById(args.movieId)
      await Movie.findByIdAndRemove(args.movieId)
      return movieDelete
    }
  }
}
