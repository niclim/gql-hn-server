const rootSchema = require('../schema/schema')
const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  mockServer
} = require('graphql-tools')

describe('Schema', () => {
  const mockSchema = makeExecutableSchema({ typeDefs: [rootSchema] })

  addMockFunctionsToSchema({
    schema: mockSchema,
    mocks: {
      Boolean: () => false,
      ID: () => '1',
      Int: () => 1,
      Float: () => 12.34,
      String: () => 'Dog'
    }
  })

  test('has valid type definitions', async () => {
    expect(async () => {
      const MockServer = mockServer(rootSchema)

      await MockServer.query(`{ __schema { types { name } } }`)
    }).not.toThrow()
  })
})
