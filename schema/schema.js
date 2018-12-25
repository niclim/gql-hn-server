module.exports = `
enum ItemType {
  # job
  story
  comment
  # poll
  # pollopt
}

type User {
  id: String!
  created: Int!
  karma: Int!
  delay: Int 
  about: String
  submitted: [Item]
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
  kids: [Comment]
  url: String
  score: Int
  title: String
  parts: [Int]
  descendants: Int
}

type Comment {
  id: Int
  type: ItemType
  by: String
  parent: Int
  time: Int
  text: String
  kids: [Comment]
}

type Story {
  id: Int!
  by: String
  descendants: Int
  type: ItemType
  time: Int
  url: String
  score: Int
  title: String
  text: String
  kids: [Comment]
}

# Explicitly exclude kids
type TopItem {
  id: Int!
  by: String
  descendants: Int
  type: ItemType
  time: Int
  url: String
  score: Int
  title: String
  text: String
}

enum StoryType {
  top
  new
  best
  ask
  show
  # job
}

type Query {
  stories(
    type: StoryType
    limit: Int
  ): [TopItem]
  story(
    id: Int!
  ): Story
  user(
    id: String!
  ): User
}

schema {
  query: Query
}
`
