const express = require('express');
const router  = express.Router();
const Celebrity = require("../models/Celebrity");

/* all celebrities */
router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then(celebrlties=>{
        res.render("celebrities", {celebrlties:celebrlties})
    })
});

/* show one celebrtity*/
router.get('/celebrities/:id', (req, res, next) => {
    Celebrity.findById(req.params.id)
    .then(celebrity => {
      res.render('celebrities-detail', {
        celebrity:celebrity
      });
    })
  });

  /* add a celebrity*/
  router.get('/celebrity/add', (req, res, next) => {
    res.render('add-celebrity');
  })
  
router.post('/celebrity/add', (req, res, next) => {
  console.log("req.body", req.body);
  let newCelebrity = {
   name:req.body.name,
   occupation:req.body.occupation,
   catchPhrase:req.body.catchPhrase
  
  }
  Celebrity.create(newCelebrity)
  .then(celebrities => {
    console.log("The home was saved!!!");
    res.redirect("/celebrities" );
  })
})

/* delete a celebrity */
router.post("/celebrities/:id/delete", (req, res)=>{
  Celebrity.findByIdAndRemove(req.params.id)
   .then(celebrity => {
     res.redirect("/celebrities");
  })
})

//update a celebrity
router.get('/celebrities/:id/edit', (req, res, next) => {
  Celebrity.findById(req.params.id)
  .then(celebrities=> {
    res.render("edit", {celebrities:celebrities})
   
  })
  .catch((error) => {
    console.log(error)
  })
});

router.post('/celebrities/:id', (req, res, next) => {
  const { name, occupation, catchPhrase} = req.body;
  Celebrity.findByIdAndUpdate(req.params.id, {
    "name":name,
    "occupation":occupation,
    "catchPhrase":catchPhrase
  } )
  .then((celebrity) => {
    res.redirect('/celebrities/' + req.params.id)
  })
  .catch((error) => {
    console.log(error)
  })
});

// search not recommended 
/*router.get('/search', (req, res, next) => {
res.render("search")
});

router.post('/search', (req, res, next) => {
  const {search}= req.body
  Celebrity.find({name: new RegExp(search, "i")})
  .then(celebrities=>{
res.render("search", {
  celebrities:celebrities

})
  
  })
  
  }); */
  // SEARCH better way!
  router.get('/search', (req, res, next) => {
    const {search}= req.query;
    if(!search)
    res.render("search")
    else{
      Celebrity.find({name: new RegExp(search, "i")
    })
  .then(celebrities=>{
res.render("search", {
  "celebrities":celebrities.map(c=>({
    name:c.name,
    occupation:c.occupation,
    score: 100
  })),
  "isNoResult": celebrities.length === 0
})
  })
  .catch(error=>{
    console.log(error)
  })
    }
    });






module.exports = router;