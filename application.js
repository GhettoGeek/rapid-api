import config from './bin/config'
import Errors from './bin/errors'
import subdomain from 'express-subdomain'
import express from 'express'
import favicon from 'serve-favicon'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import chalk from 'chalk'

// project imports
// import api from './api'
// import admin from './admin'
// import client from './client'

// instance of express
const app = express()

// start message
/* eslint-disable no-console */
console.log(chalk.cyan(`Running in ${config.env} mode`))

// connect to the database
mongoose.connect(config.database())
const db = mongoose.connection
db.on('error', function() {
  console.log(chalk.red('Failed to connect to the database'))
}).once('open', function() {
  console.log(chalk.green('Successfully connected to the database'))
})
/* eslint-enable no-console */

// use middlewares
app.use(subdomain('storage', express.static('storage')))
app.use(favicon('storage/favicon.png'))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

// project middlewares
// app.use(subdomain('api', api()))
// app.use(subdomain('control', admin()))
// app.use('/', client())

app.get('/book', function(req, res) {
  res.send('book')
})

// catch 404
app.use(function(req, res, next) {
  next(new Errors.NotFound())
})

// error handler
app.use(function(err, req, res, next) {
  if(err && err.statusCode)
    res.status(err.statusCode).send(`${err.statusCode} ${err.message}`)
  else
    next(err)
})

module.exports = app
