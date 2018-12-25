const mockStoryIds = [1, 2]
const mockStories = {
  1: {
    id: 1,
    by: 'fake',
    type: 'story',
    kids: [3, 4]
  },
  2: {
    id: 2,
    by: 'fake',
    type: 'story',
    kids: [122, 2134]
  }
}

const mockComments = {
  3: {
    id: 3,
    by: 'otheruser',
    type: 'comment',
    parent: 1
  },
  4: {
    id: 3,
    by: 'otheruser',
    type: 'comment',
    kids: [5],
    parent: 1
  },
  5: {
    id: 3,
    by: 'otheruser',
    type: 'comment',
    parent: 4
  }
}

const mockUser = {
  id: 'fake',
  created: 1173923446,
  karma: 234,
  delay: 0,
  about: '',
  submitted: [1, 2]
}

const mockItems = {
  ...mockStories,
  ...mockComments
}

module.exports = {
  mockStories,
  mockStoryIds,
  mockUser,
  mockComments,
  mockItems
}
