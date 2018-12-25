const rootResolver = {
  Query: {
    stories: (_, { type = 'best', limit = 20 }, context) =>
      context.Stories.getStories(type, limit),
    story: (_, { id }, context) => context.Stories.getStory(id),
    user: (_, { id }, context) => context.User.getUser(id)
  },
  Story: {
    kids: (story, _, context) => story.kids.map(context.Comment.getComment)
  },
  Comment: {
    kids: (comment, _, context) =>
      Array.isArray(comment.kids)
        ? comment.kids.map(context.Comment.getComment)
        : null
  },
  User: {
    submitted: (user, _, context) =>
      user.submitted.map(context.Comment.getComment)
  }
}

module.exports = rootResolver
