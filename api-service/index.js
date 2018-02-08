import { createServer } from 'http'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import schema from './schema'
import Movie from './models/Movie'
require('dotenv').config()

// create express app and http server
const app = express()
const server = createServer(app)

const PORT = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV || 'development'

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

// set generic middlewares
app.use(cors());
app.use(compression());
app.use(morgan('common'));  

// set /graphql endpoint
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({ schema, context: { Movie } })
)

// set GraphiQL IDE in development
if (NODE_ENV !== 'production') {
  app.use(graphiqlExpress({ endpointURL: '/graphql' }))
}

app.listen(PORT, err => {
  if (err) throw err
  console.log(`> Ready On http://localhost:${PORT}/graphiql`)
})
