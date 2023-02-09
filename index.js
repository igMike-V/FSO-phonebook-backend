require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')
const { response } = require('express')

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
app.get('/api/persons/:id', (req, res) => {
    // Id from params is a string.  convert to number
    Person.findById(req.params.id).then(person => {
        res.json(person)
    })
})

// TODO Delete an entry
app.delete('/api/persons/:id', (req, res) => {
    // Id from params is a string.  convert to number
    const id = Number(req.params.id)
    if(persons.find(item => item.id === id)){
        persons = persons.filter(person => person.id !== id)
        res.status(200).end()
    } else {
        res.status(404).end()
    }
})

// Add a new entry
app.post('/api/persons', (req, res) => {
    const body = req.body
     // Error handling for name
    if(!body.name){
        return res.status(400).json({
            error: 'Request must contain a name'
        })
    }
    // Error handling for number
    if(!body.number){
        return res.status(400).json({
            error: 'Request must contain a number'
        })
    }

    const newPerson = new Person({ 
        "name": body.name, 
        "number": body.number
      })

    newPerson.save().then(savedPerson => {
        res.json(savedPerson)
    })

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})