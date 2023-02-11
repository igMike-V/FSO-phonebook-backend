require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')
//const { response } = require('express')

app.use(cors())
// MORGAN - Create a new token for the request data body
morgan.token('req-data', req => {
// If method is post then return the body
  if(req.method === 'POST'){
    return JSON.stringify(req.body)
  }
  // Note Post
  return
})

// Set express to use Json and morgan middleware
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :response-time :req-data'))

//Routes
app.get('/', (req, res) => {
  res.send('<h1>Phonebook Api</h1><p>Use /api/persons to return the listings.</p>')
})

// Return info on the api
app.get('/info', (req, res) => {
  const date = new Date()

  Person.find({}).then(people => {
    const pageContent = `
            <p>Phonebook has info for ${people.length} ${people.length === 1 ? 'person' : 'people' }</p>
            <p>${date}</p>
        `
    res.send(pageContent)
  })
})

// Get all people
app.get('/api/persons', (req, res) => {
  Person.find({}).then(people => {
    res.json(people)
  })
})

// Get a single person
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    res.json(person)
  })
    .catch(error => next(error))
})

// Delete an entry
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

// Add a new entry
app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const newPerson = new Person({
    'name': body.name,
    'number': body.number
  })

  newPerson.save().then(savedPerson => {
    res.json(savedPerson)
  })
    .catch( error => next(error))

})

// Update an entry
app.put('/api/persons/:id', (req, res, next) => {
  const { number, name } = req.body

  Person.findByIdAndUpdate(req.params.id,
    { number, name },
    { new : true, runValidators: true, context: 'query' }
  )
    .then(returnedUpdate => {
      res.json(returnedUpdate)
    })
    .catch(error => next(error))
})


// for unknown endpoints:
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown Endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError'){
    return res.status(400).send(error.message)
  } else if (error.name === 'MongoServerError') {
    return(res.status(400).send(error.message))
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})