const mongoose = require('mongoose')

let password = ''
let inputName = ''
let inputNumber = ''
let url = ''

const getListings = () => {
  console.log('phonebook:')

  const personSchema = mongoose.Schema({
    name: String,
    number: String,
  })

  const Person = mongoose.model('Person', personSchema)

  Person.find({}).then(res => {
    res.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
    process.exit(0)
  })
}


const createListing = () => {
  inputName = process.argv[3]
  inputNumber = process.argv[4]

  const personSchema = mongoose.Schema({
    name: String,
    number: String,
  })

  const Person = mongoose.model('Person', personSchema)

  const person = new Person({
    name: inputName,
    number: inputNumber,
  })


  person.save().then(res => {
    console.log(`added ${res.name} number ${res.number} to phonebook`)
    mongoose.connection.close()
    process.exit(0)
  })
}


// Check for correct args
if (process.argv.length === 5 || process.argv.length === 3) {
  password = process.argv[2]
  url = `mongodb+srv://iglabmv:${password}@cluster0.avygyqg.mongodb.net/phoneBook?retryWrites=true&w=majority`
  mongoose.set('strictQuery', false)
  mongoose.connect(url)


  if(process.argv.length === 3){
    getListings()
  } else {
    createListing()
  }

} else {
  console.log('oops... missing arguments. Provide a password and optionally a name and number.')
  process.exit(1)
}

