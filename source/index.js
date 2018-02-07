import express from 'express'

// source imports
// import library from './library'

// export function
const source = function() {
  const sourceRouter = express.Router()

  // source middlewares
  // sourceRouter.use('/library', library())

  sourceRouter.get('/', function(req, res) {
    res.send('You\'re in Source!')
  })

  sourceRouter.get('/library', function(req, res) {
    res.send('You\'re in Library!')
  })

  return sourceRouter
}

module.exports = source
