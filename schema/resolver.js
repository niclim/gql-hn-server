const maybeFetchComments = (maybeArray, args, context) =>
  Array.isArray(maybeArray) ? maybeArray.map(context.Comment.getComment) : null

const rootResolver = {
  Query: {
    stories: (_, { type = 'best', limit = 20 }, context) =>
      context.Stories.getStories(type, limit),
    story: (_, { id }, context) => context.Stories.getStory(id),
    user: (_, { id }, context) => context.User.getUser(id)
  },
  Story: {
    kids: (story, args, context) =>
      maybeFetchComments(story.kids, args, context)
  },
  Comment: {
    kids: (comment, args, context) =>
      maybeFetchComments(comment.kids, args, context)
  },
  User: {
    submitted: (user, args, context) =>
      maybeFetchComments(user.submitted, args, context)
  }
}

module.exports = rootResolver
