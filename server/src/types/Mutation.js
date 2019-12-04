const { compare, hash } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const { idArg, mutationType, stringArg, booleanArg } = require('nexus')
const { APP_SECRET, getUserId } = require('../utils')

const Mutation = mutationType({
  definition(t) {
    // t.field('signup', {
    //   type: 'AuthPayload',
    //   args: {
    //     name: stringArg({ nullable: true }),
    //     email: stringArg(),
    //     password: stringArg(),
    //   },
    //   resolve: async (parent, { name, email, password }, ctx) => {
    //     const hashedPassword = await hash(password, 10)
    //     const user = await ctx.photon.users.create({
    //       data: {
    //         name,
    //         email,
    //         password: hashedPassword,
    //       },
    //     })
    //     return {
    //       token: sign({ userId: user.id }, APP_SECRET),
    //       user,
    //     }
    //   },
    // })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (parent, { email, password }, context) => {
        const user = await context.photon.users.findOne({
          where: {
            email,
          },
        })
        if (!user) {
          throw new Error(`No user found for email: ${email}`)
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('createDraft', {
      type: 'Post',
      args: {
        title: stringArg(),
        body: stringArg({ nullable: true }),
      },
      resolve: (parent, { title, body }, ctx) => {
        const userId = getUserId(ctx)
        return ctx.photon.posts.create({
          data: {
            title,
            body,
            published: false,
            author: { connect: { id: userId } },
          },
        })
      },
    })

    t.field('deletePost', {
      type: 'Post',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.photon.posts.delete({
          where: {
            id,
          },
        })
      },
    })

    t.field('updatePost', {
      type: 'Post',
      nullable: true,
      args: {
        path: stringArg(),
        title: stringArg(),
        body: stringArg(),
        published: booleanArg(),
      },
      resolve: (parent, { path, title, body, published }, ctx) => {
        return ctx.photon.posts.update({
          where: { path },
          data: {
            title,
            body,
            published,
          },
        })
      },
    })

    t.field('publish', {
      type: 'Post',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.photon.posts.update({
          where: { id },
          data: { published: true },
        })
      },
    })
  },
})

module.exports = {
  Mutation,
}
