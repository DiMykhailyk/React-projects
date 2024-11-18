const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

mongoose.set('strictQuery', false)

const { Schema } = mongoose

const PRIVATE_KEY = `SECRET_KEY!`

const todoSchema = new Schema({
  label: String,
  isChecked: Boolean,
  userId: String,
})

const userSchema = new Schema({
  id: String,
  login: String,
  hashPassword: String,
})

const refreshSchema = new Schema({
  userId: String,
  token: String,
  expires: String,
})

class DB {
  constructor() {
    this.connectionString = 'mongodb://localhost/todos_db'
    this.mongoInstance = null
    this.todoModel = null
    this.userModel = null
    this.refreshModel = null
  }
  
  async createSchema() {
    return new Promise((resolve) => { 
      this.todoModel = mongoose.model('Todo', todoSchema)
      this.userModel = mongoose.model('User', userSchema)
      this.refreshModel = mongoose.model('Token', refreshSchema)
      resolve()
    })
  }

  generationRefreshToken(userId, token, expires) {
    const refreshToken = new this.refreshModel(userId, token, expires)
    return refreshToken
  }

  async getUserById(userId) {
    const res = await this.userModel.findOne({ _id: userId })
    return res
  }

  async getUserIdByRefreshToken(refToken) {
    const refTokenRecord = await this.refreshModel.findOne({ token: refToken })
    return refTokenRecord || null
  }

  async checkToken(token) {
    try {
      await jwt.verify(token, PRIVATE_KEY)
      return true
    } catch (err) {
      return false
    }
  }

  async register(user) {
    const existingUser = await this.userModel.findOne({ login: user.login })
    if (existingUser) {
      throw new Error('this user already exists')
    }
    const hashedPassword = await bcrypt.hash(user.password, 10)
    const userAdd = new this.userModel({ ...user, hashPassword: hashedPassword })
    const res = await userAdd.save()

    return {
      login: res.login,
    }
  }

  async login({ login, password, id }) {
    const user = await this.userModel.findOne({ login })
    if (user) {
      const passwordCorrect = await bcrypt.compare(password, user.hashPassword)
      if (user && passwordCorrect) {
        return {
          login: user.login,
          id: user._id,
        }
      }
    } else {
      return null
    }

    throw new Error('Invalid password or login')
  }

  async getTodos(userId) {
    if (this.todoModel) {
      const todos = await this.todoModel.find({ userId })
      return todos
    } else {
      throw new Error('For some reasons todoModel is not initialized')
    }
  }

  async addTodo({ label, userId }) {
    const todo = new this.todoModel()
    todo.label = label
    todo.userId = userId
    todo.isChecked = false
    const res = await todo.save()
    return {
      label: res.label,
      userId: res.userId,
      isChecked: res.isChecked,
      id: res._id,
    }
  }
  async editTodoById(id, changedData) {
    const record = await this.todoModel.findOne({ _id: id })
    record.isChecked = changedData.checked
    record.label = changedData.label
    return await record.save()
  }

  removeTodoById(todoId) {
    return this.todoModel.deleteOne({ _id: todoId })
  }

  async connect() {
    return await new Promise((resolve) => {
      mongoose.connect(this.connectionString)
        .then((instance) => {
          resolve(true)
        })
    })
  }

  disconnect() {
    return this.mongoInstance.disconnect()
  }
}

module.exports = DB
