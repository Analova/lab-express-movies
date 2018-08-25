const celebrity = require("../data/celebrity");
const Celebrity = require("../models/Celebrity");


const mongoose = require ("mongoose")

mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/lab-express-cinema', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  Celebrity.deleteMany(  )
  .then(x=>{console.log(x + " celebrities were deleted")
      console.log( )
  })


  Celebrity.create( celebrity )
  .then(celebrityFromDb=>{
      console.log(celebrityFromDb.length +  "celebrities were created" )
  })

  