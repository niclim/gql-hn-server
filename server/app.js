const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('../schema')
const config = require('../config')

module.exports = () => {
  const app = express()
  const isDev = config.server.env !== 'production'

  app.use(
    '/gql',
    graphqlHTTP({
      schema,
      ...(isDev && { graphiql: true })
    })
  )

  return app
}
