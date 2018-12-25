const { makeExecutableSchema } = require('graphql-tools')

const config = require('../config')

const rootSchema = require('./schema')
const rootResolver = require('./resolver')

let logger

if (config.server.env !== 'production') {
  logger = { log: e => console.log(e) }
}

module.exports = makeExecutableSchema({
  typeDefs: [rootSchema],
  logger,
  resolvers: rootResolver
})
