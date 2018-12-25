module.exports = `
enum ItemType {
  # job
  story
  comment
  # poll
  # pollopt
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
}

schema {
  query: Query
}
`
