const rootResolver = {
  Query: {
    stories: (_, { type = 'best', limit = 20 }, context) =>
      context.Stories.getStories(type, limit),
    story: (_, { id }, context) => context.Stories.getStory(id)
  },
  Story: {
    kids: (story, _, context) => story.kids.map(context.Comment.get)
  },
  Comment: {
    kids: (comment, _, context) =>
      Array.isArray(comment.kids) ? comment.kids.map(context.Comment.get) : null
  }
}

module.exports = rootResolver
