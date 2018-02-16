import errHandle from 'rapid-error-handler'
import Book from './model'

// export function
module.exports = {
  // get all items
  getAll: function(req, res, next) {
    const query = {}
    if(req.query.read) query.read = req.query.read

    Book.find(query, function(err, books) {
      handler(err, next, function() {
        const returnBooks = []
        books.forEach(function(element) {
          const book = element.toJSON()
          book.links = {}
          book.links.self = `http://${req.headers.host}/book/${book._id}`
          returnBooks.push(book)
        })
        res.send(returnBooks)
      })
    })
  },

  // post new item
  post: function(req, res, next) {
    if(req.body._id) delete req.body._id
    if(req.body.timestamp) delete req.body.timestamp
    const book = new Book(req.body)

    book.save(function(err) {
      handler(err, next, function() {
        res.status(201).send(book)
      })
    })
  },

  // find one item
  find: function(req, res, next) {
    Book.findById(req.params.id, function(err, book) {
      handler(err, next, function() {
        if(book) {
          req.book = book
          next()
        } else next(new errHandle.NotFound('Book not found'))
      })
    })
  },

  // get one item
  get: function(req, res) {
    res.send(req.book)
  },

  // update an item
  patch: function(req, res, next) {
    if(req.body._id) delete req.body._id
    if(req.body.timestamp) delete req.body.timestamp
    for(const x in req.body) req.book[x] = req.body[x]

    req.book.save(function(err) {
      handler(err, next, function() {
        res.send(req.book)
      })
    })
  },

  // delete an item
  delete: function(req, res, next) {
    req.book.remove(function(err) {
      handler(err, next, function() {
        res.status(204).send({status: 204, message: 'Book has removed'})
      })
    })
  }
}

// handler function
function handler(err, next, callback) {
  if(err) next(new errHandle.BadRequest(err))
  else callback()
}
