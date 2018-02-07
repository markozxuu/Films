'use strict'

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const schema = require('./schema')
const Movie = require('./models/Movie')
require('dotenv').config()

const app = express()
const PORT = parseInt(process.env.PORT, 10) || 3000

mongoose.Promise = global.Promise;
// Start connection
mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    console.log('Connected to MongoDB! 😃🔥')
  })
  .catch(() => {
    console.error('Failed to connect to MongoDB 😕💥')
  })

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({ schema, context: { Movie } })
)
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
app.use(cors())

app.listen(PORT, err => {
  if (err) throw err
  console.log(`> Ready On http://localhost:${PORT}/graphiql`)
})
