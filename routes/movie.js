const express = require('express');
const router  = express.Router();
const Movie = require("../models/Movie");

// All celebrities
router.get("/movies",(req,res,next)=>{
    Movie.find()
    .then(moviesfromDb=>{
        res.render("movies/movies", {movies:moviesfromDb})
    })
   
});

// show one movies
router.get("/movies/:id", (req,res,next)=>{
    Movie.findById(req.params.id)
    .then(movie=>{
        res.render("movies/movies-detail", {
            movie:movie
        });
    })
});

// add a movie
router.get("/movie/add" , (req,res,next)=>{
    res.render("movies/add-movie")
})

router.post("/movie/add", (req,res,next)=>{
    let newMovie={
        title:req.body.title,
        genre:req.body.genre,
        plot:req.body.plot
    }
    Movie.create(newMovie)
    .then(movie=>{
        res.redirect("/movies")
    })
})

//delete a movie
router.post("/movies/:id/delete", (req,res,next)=>{
    Movie.findByIdAndRemove(req.params.id)
    .then(movie=>{
        res.redirect("/movies")
    })
    .catch((error) => {
    console.log(error)
})
})

// update a movie
router.get("/movies/:id/edit", (req,res, next)=>{
    Movie.findById(req.params.id)
    .then(movies=>{
        res.render("movies/movie-edit", {movies:movies})
    })
    .catch((error) => {
        console.log(error)
      })
})

router.post("/movies/:id", (req,res,next)=>{
    const {title,genre,plot}=req.body;
    Movie.findByIdAndUpdate(req.params.id,{
        "title":title,
        "genre":genre,
        "plot": plot
    })
    .then(movie=>{
        res.redirect('/movies/' + req.params.id)
    })
    .catch((error) => {
        console.log(error)
      })
})



module.exports = router;