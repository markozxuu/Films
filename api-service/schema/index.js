'use strict'

const { makeExecutableSchema } = require('graphql-tools')
const Movie = require('./Movie.graphql')
const resolvers = require('../resolver')

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
module.exports = makeExecutableSchema({
  typeDefs: [rootQuery, Movie],
  resolvers
})
