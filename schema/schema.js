module.exports = [
  `
enum ItemType {
  job
  story
  comment
  poll
  pollopt
}

type Item {
  id: Int!
  deleted: Boolean
  type: ItemType
  by: String
  time: Int
  text: String
  dead: Boolean
  parent: Int
  poll: Int
  kids: [Int]
  url: String
  score: Int
  title: String
  parts: [Int]
  descendants: Int
}

type Query {
  test(type: Int): Int
}

schema {
  query: Query
}
`
]
