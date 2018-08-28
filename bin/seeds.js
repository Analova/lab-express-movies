const celebrity = require("../data/celebrity");
const Celebrity = require("../models/Celebrity");
// Movies
const movie = require("../data/movie");
const Movie = require("../models/Movie");

const mongoose = require ("mongoose")

mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/lab-express-cinema', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  /*Celebrity.deleteMany(  )
  .then(x=>{console.log(x + " celebrities were deleted")
      console.log( )
  })


  Celebrity.create( celebrity )
  .then(celebrityFromDb=>{
      console.log(celebrityFromDb.length +  "celebrities were created" )
  }) */

  // Movies create 
  Movie.deleteMany(  )
  .then(x=>{console.log(x + "movies were deleted")
      console.log( )
  })


  Movie.create(movie)
  .then(movie=>{
      console.log(movie.length +  "movies were created" )
  })