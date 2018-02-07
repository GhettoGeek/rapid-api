import subdomain from 'express-subdomain'
import express from 'express'

// api imports
import v1 from './v1'

// export function
const api = function() {
  const apiRouter = express.Router()

  // api middlewares
  apiRouter.use(subdomain('v1', v1()))

  apiRouter.get('*', function(req, res) {
    res.status(500).send('Nothing to show')
  })

  return apiRouter
}

module.exports = api