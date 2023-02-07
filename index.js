const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

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
app.use(express.json())
app.use(morgan(':method :url :status :response-time :req-data'))


// Hardcoded Data
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

//Routes

app.get('/', (req, res) => {
    res.send('<h1>Phonebook Api</h1><p>Use /api/persons to return the listings.</p>')
})

// Return info on the api
app.get('/info', (req, res) => {
    const date = new Date()
    const pageContent = `
        <p>Phonebook has info for ${persons.length} ${persons.length === 1 ? 'person' : 'people' }</p>
        <p>${date}</p>
    `
    res.send(pageContent)
})

// Get all people
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

// Get a single person
app.get('/api/persons/:id', (req, res) => {
    // Id from params is a string.  convert to number
    const id = Number(req.params.id)
    const person = persons.find(item => item.id === id)
    
    // Check if person contains something
    if(person){
        // Respond with person
        res.json(person)
    } else {
        // Set status as not found and end
        res.status(404).end()
    }
    
})

// Delete an entry
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

// Get a unique id for the post
const getRandomId = () => {
    let id = 0
    // Set id to a random number, continue getting new random numbers until a unique value is found
    do {
        id = Math.floor(Math.random() * 99999999999)
    } while (persons.find(person => person.id === id))
    return id
}

// Add a new entry
app.post('/api/persons', (req, res) => {
    const body = req.body
    let newId = getRandomId()
    
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

    const newEntry = { 
        "id": newId,
        "name": body.name, 
        "number": body.number
      }
    persons.push(newEntry)
    res.json(newEntry)

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})