const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('../schema')
const config = require('../config')

const Comment = require('../models/Comment')
const Stories = require('../models/Stories')

module.exports = () => {
  const app = express()
  const isDev = config.server.env !== 'production'

  app.use(
    '/gql',
    graphqlHTTP(request => ({
      schema,
      context: { Comment: new Comment(), Stories: new Stories() },
      ...(isDev && { graphiql: true })
    }))
  )

  return app
}
