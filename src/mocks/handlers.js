import {rest} from 'msw'
import {mockDb} from './db'

export const handlers = [
  rest.post('http://localhost:3500/auth', async (req, res, ctx) => {
    const {user, pwd} = await req.json()
    const registeredUser = mockDb.find(
      (registeredUser) => registeredUser.user === user
    )

    if (registeredUser && registeredUser.pwd === pwd) {
      return res(
        ctx.status(200),
        ctx.json({
          user: registeredUser.user,
          roles: registeredUser.roles,
          accessToken: Math.random(),
        })
      )
    } else if (registeredUser && registeredUser.pwd !== pwd) {
      return res(ctx.status(401))
    }
    return res(ctx.status(404))
  }),
]
