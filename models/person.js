const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)
mongoose.connect(process.env.url)
    .then(() => console.log("Successfully connected"))
    .catch((err) => console.log(`err: ${err.message}`))


const personValidator = (phoneNumber) => {
  let regex = /^\d{2,4}-\d+$/;
  return regex.test(phoneNumber);

}
const custom = [personValidator, 'Example Number: 0912-123123']
const personSchema = mongoose.Schema({
    name: {
      type: String,
      minLength : 3,
      required: true,
      
    },
    number: {
      type: String,
      validate: custom,
    },
    
})
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })


module.exports = mongoose.model('person', personSchema)