const rootResolver = require('../schema/resolver')
const { HNClient } = require('../clients')
const Comment = require('../models/Comment')
const Stories = require('../models/Stories')
const User = require('../models/User')

const {
  mockStoryIds,
  mockStories,
  mockUser,
  mockComments,
  mockItems
} = require('./mockData')

const context = {
  Comment: new Comment(),
  Stories: new Stories(),
  User: new User()
}

jest.mock('../clients')

afterEach(() => {
  jest.resetAllMocks()
})

describe('queries', () => {
  test('stories resolver should return stories from hn', async done => {
    HNClient.getStoryIds.mockReturnValue(mockStoryIds)
    HNClient.getItem.mockImplementation(id => mockStories[id])

    const stories = await rootResolver.Query.stories(null, {}, context)

    stories.forEach((story, i) => {
      // Should not have the kids property
      expect(story.kids).toBeUndefined()
      expect(story.id).toBe(mockStoryIds[i])
    })

    done()
  })

  test('story resolver should return a single story from hn', async done => {
    HNClient.getItem.mockReturnValue(mockStories[mockStoryIds[0]])
    const story = await rootResolver.Query.story(null, {}, context)

    expect(story).toEqual(mockStories[mockStoryIds[0]])
    done()
  })

  test('user resolver should return a user from hn', async done => {
    HNClient.getUser.mockReturnValue(mockUser)
    const user = await rootResolver.Query.user(
      null,
      { id: mockUser.id },
      context
    )

    expect(HNClient.getUser).toBeCalledWith(mockUser.id)
    expect(user).toBe(mockUser)
    done()
  })
})

describe('Story resolver', () => {
  test('kids should fetch comments', async done => {
    HNClient.getItem.mockImplementation(id => mockItems[id])

    const story = mockStories[1]
    const kids = await Promise.all(rootResolver.Story.kids(story, {}, context))

    expect(kids[0]).toEqual(mockComments[3])
    expect(kids[1]).toEqual(mockComments[4])

    done()
  })
})

describe('Comment resolver', () => {
  test('kids should only be fetched if there are comments', async done => {
    HNClient.getItem.mockImplementation(id => mockItems[id])

    const comment = mockComments[4]
    const kids = await Promise.all(
      rootResolver.Comment.kids(comment, {}, context)
    )

    expect(kids[0]).toEqual(mockComments[5])
    done()
  })
})

describe('User resolver', () => {
  test('submitted items should be resolved to comments / stories', async done => {
    HNClient.getItem.mockImplementation(id => mockItems[id])

    const user = mockUser
    const submitted = await Promise.all(
      rootResolver.User.submitted(user, {}, context)
    )
    expect(submitted[0]).toBe(mockStories[1])
    expect(submitted[1]).toBe(mockStories[2])
    done()
  })
})
