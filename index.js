const { response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())
let notes = 
    [
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

app.get('/api/persons', (req, res) => {
    res.json(notes)
})
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    if (id in notes.map(n => n.id)) {
        notes = notes.filter(person => person.id !== id)
        res.status(204).send(notes)
    } else {
        res.status(404).send("<h1>No ID found in db<h1>")
    }
    
})
app.post('/api/persons/', (req, res) => {
    const body = req.body
    if (!body.content) {
        return response.status(400).json({
            error: "content missing"
        })
    }
    if (body.name.toLowerCase() in notes.map(n => n.name)) {
        return response.status(400).json({
            error: "Name already exists in database"
        })
    }
    const person = {
        id: Math.ceil(Math.random() * 100),
        name: body.name,
        number: body.number
    }
    notes = notes.concat(person)
    res.status(200).json(note)
})
app.get('/info', (req, res) => {
    const date = new Date()
    res.send(`Phonebook has info for ${notes.length} people. \n ${date}`)
})

app.listen(3001, (req, res) => {
    console.log("listening on port 3001");
})