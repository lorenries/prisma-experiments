const { objectType } = require('nexus')

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.path()
    t.model.createdAt()
    t.model.publishedAt()
    t.model.published()
    t.model.title()
    t.model.body()
  },
})

module.exports = {
  Post,
}
