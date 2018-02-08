import { makeExecutableSchema } from 'graphql-tools'
import Movie from './Movie.graphql'
import resolvers from '../resolver'

const rootQuery = `
    type Query {
        allFilms: [Movie!]!
        getMovie(id: String): Movie
    }

    type Mutation {
        movieAdd(movie: NewMovie): Movie!
        movieEdit(movieId: String, movie: EditMovie): Movie
        movieDelete(movieId: String): Movie
    }
`
export default makeExecutableSchema({
  typeDefs: [rootQuery, Movie],
  resolvers
})
