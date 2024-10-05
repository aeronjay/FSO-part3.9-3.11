const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)
mongoose.connect(process.env.url)
    .then(() => console.log("Successfully connected"))
    .catch((err) => console.log(`err: ${err.message}`))


const personSchema = mongoose.Schema({
    name: String,
    number: String,
})
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })


module.exports = mongoose.model('person', personSchema)