// Use offset based pagination
const maybeFetchComments = (maybeArray, { first = 20, after = 0 }, context) =>
  Array.isArray(maybeArray)
    ? maybeArray.slice(after, after + first).map(context.Comment.getComment)
    : null

const rootResolver = {
  Query: {
    stories: (_, { type = 'best', first = 20, after = 0 }, context) =>
      context.Stories.getStories(type, first, after),
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
