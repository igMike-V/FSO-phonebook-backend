const express = require('express')
const app = express()

app.use(express.json())

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

app.get('/info', (req, res) => {
    const date = new Date()
    const pageContent = `
        <p>Phonebook has info for ${persons.length} ${persons.length === 1 ? 'person' : 'people' }</p>
        <p>${date}</p>
    `
    res.send(pageContent)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`http://localhost:3001`)
})