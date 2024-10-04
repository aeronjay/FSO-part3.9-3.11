const mongoose = require('mongoose')

if(process.argv.length < 3 || process.argv.length === 4 || process.argv.length > 5){
    console.log("Use Case Get all data: node mongo.js password")
    console.log("Use Case add person: node mongo.js password name number")
    process.exit(1)
}
console.log(process.argv.length)
const password = process.argv[2]

const uri = `mongodb+srv://phonebook:${password}@cluster0.elobk.mongodb.net/Persons?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(uri)


const Person = new mongoose.model('Person', new mongoose.Schema({
    name: String,
    number: String,
}))


function getPersons(){

    Person.find({}).then((result) => {
        console.log("Phonebook: ")
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}
function addPerson(){

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    person.save().then(result => {
        console.log(`saved: ${result}`)
        mongoose.connection.close()
    })

}

switch(process.argv.length){
    case 3:
        // get all persons
        getPersons()
        break;
    case 5:
        // add person
        addPerson()
        break;
}
