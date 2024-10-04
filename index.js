const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const person = require('./models/person')

const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
morgan.token('body', function (req,res){return JSON.stringify(req.body)})
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens['body'](req,res)
    ].join(' ')
  })
)



app.get("/api/persons", (req,res) => {
    person.find({}).then(result => res.json(result))
})
app.get("/info", (req,res) => {
    const date = new Date()
    const month = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const body = (
        `<h4>Phonebook Has Info For ${persons.length} people</h4>`
        + 
        `<p>${day[date.getDay()]} ${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} 
        ${date.getHours()}:${date.getMinutes()} ${date.getHours() <= 11 ? "AM" : "PM"}
        </p>`
    )
    res.send(body)
})
app.get("/api/persons/:id", (req,res) => {
    const id = req.params.id
    const person = persons.find((n) => n.id === id)

    if(person){
        res.json(person)
    }else{
        res.status(404).end()
    }
})

app.delete("/api/persons/:id", (req,res) => {
    const id = req.params.id
    persons = persons.filter((person) => person.id !== id)
    console.log("deleted id of ", id)
    res.status(204).end()
})

const generateID = () => {
    return String(Math.floor(Math.random() * 10000))
}
const nameExists = (name) => {
    return persons.some((person) => {
        return person.name === name
    })
}

app.post("/api/persons", (req,res) => {
    if(!(req.body.name) || !(req.body.number)) {
        return res.status(400).json({
            error: "content missing"
        })
    }
    // if(nameExists(req.body.name)){
    //     return res.status(400).json({
    //         error: "name already exists"
    //     })
    // }

    const newPerson = new person({
        name: req.body.name,
        number: req.body.number
    })

    newPerson.save().then(result => {
        res.json(result)
    })    
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log("port running in ", PORT)
})