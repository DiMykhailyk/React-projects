const Koa = require('koa')
const crypto = require('crypto')
const KoaRouter = require('koa-router')
const json = require('koa-json')
const jwt = require('jsonwebtoken')
const bodyParser = require('koa-bodyparser')
const Db = require('./db.js')
const cors = require('@koa/cors')
const bcrypt = require('bcrypt')

const mongoInstance = new Db()

const PORT = 3001
const app = new Koa()
const router = new KoaRouter()
app.use(bodyParser())

const PRIVATE_KEY = `SECRET_KEY!`

if (typeof String.prototype.replaceAll === 'undefined') {
  String.prototype.replaceAll = function (match, replace) {
    return this.replace(new RegExp(match, 'g'), () => replace)
  }
}

const checkAuth = async (ctx) => {
  const authTokenHeader = ctx.request.headers['authorization'] || ''
  const token = authTokenHeader.replace('Bearer ', '').replaceAll(`''`, '').replaceAll('"', '')
  if (!token) {
    ctx.throw(400)
  }
  const isAuthorized = await mongoInstance.checkToken(token)

  if (!isAuthorized) {
    ctx.throw(400)
  }
}

router.get('/todos', async (ctx, next) => {
  const authTokenHeader = ctx.request.headers['authorization'] || ''
  const token = authTokenHeader.replace('Bearer ', '').replaceAll(`''`, '').replaceAll('"', '')

  const isAuthorized = await checkAuth(ctx)

  const decodedToken = await jwt.verify(token, PRIVATE_KEY)

  const todos = await mongoInstance.getTodos(decodedToken.id)
  ctx.body = JSON.stringify({ todos })
  return next()
})

router.delete('/todos/:id', async (ctx, next) => {
  const isAuthorized = await checkAuth(ctx)
  await mongoInstance.removeTodoById(ctx.params.id)
  ctx.body = JSON.stringify({ deleted: true })
  return next()
})

router.post('/todos', async (ctx, next) => {
  const authTokenHeader = ctx.request.headers['authorization'] || ''
  const token = authTokenHeader.replace('Bearer ', '').replaceAll(`''`, '').replaceAll('"', '')
  const isAuthorized = await checkAuth(ctx)
  const { method, label, checked, idUser, userId } = ctx.request.body
  const decodedToken = await jwt.verify(token, PRIVATE_KEY)

  const addTodo = await mongoInstance.addTodo({ label: label, userId: decodedToken.id })
  ctx.body = JSON.stringify(addTodo)
  return next()
})

router.patch('/todos/:id', async (ctx, next) => {
  await checkAuth(ctx)
  const edited = await mongoInstance.editTodoById(ctx.params.id, ctx.request.body)
  ctx.body = JSON.stringify(edited)
  return next()
})

router.post('/login', async (ctx, next) => {
  const { login, password, id, label } = ctx.request.body
  const hashedPassword = bcrypt.hash(password, 10)
  const hashRefreshToken = crypto
    .createHmac('sha256', PRIVATE_KEY)
    .update(Math.random().toString(36).substr(2, 10))
    .digest('hex')

  try {
    const user = await mongoInstance.login({ login, password, id })
    const token = jwt.sign({ login, password: hashedPassword, id: user.id }, PRIVATE_KEY, {
      expiresIn: '10m',
    })
    const refreshToken = await mongoInstance.generationRefreshToken({
      userId: user.id,
      token: hashRefreshToken,
      expires: '30m',
    })
    const body = JSON.stringify({ user, token, refreshToken })
    ctx.body = body
    return next()
  } catch (err) {
    ctx.throw(400)
  }
})

router.post('/refresh', async (ctx, next) => {
  const userIdFromRefreshToken = await mongoInstance.getUserIdByRefreshToken(
    ctx.request.headers['X-Refresh-Token'] || '',
  )
  if (userIdFromRefreshToken) {
    const { login, hashPassword } = user
    const token = jwt.sign({ name: login, password: hashPassword }, PRIVATE_KEY, {
      expiresIn: '10m',
    })
    const body = JSON.stringify({ token: token })

    ctx.body = body
    return next()
  } else {
    ctx.throw(400)
  }
})

router.get('/whoami', async (ctx) => {
  const isAuthorized = await checkAuth(ctx)
  return next()
})

router.post('/reg', async (ctx) => {
  const { name, password } = ctx.request.body
  const hashedPassword = await bcrypt.hash(password, 10)
  const token = jwt.sign({ name, password: hashedPassword }, PRIVATE_KEY, { expiresIn: '10m' })
  const user = await mongoInstance.login({ login: name, password })

  try {
    const newUser = await mongoInstance.register({ login: name, password, token })
    ctx.body = JSON.stringify({ user: newUser })
  } catch (err) {
    ctx.catch(400)
  }
})

app.use(router.routes()).use(router.allowedMethods()).use(cors()).use(bodyParser())

const runServer = () => {
  mongoInstance.connect()
    .then(() => {
      console.log('Connected to MongoDB');
      return mongoInstance.createSchema();
    })
    .then(() => {
      console.log('Schemas created successfully');
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch(err => {
      console.error('Error starting the server:', err);
    });
};

runServer()
