const express = require('express');
const router  = express.Router();
const Celebrity = require("../models/Celebrity");

/* clelebrities route */
router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then(celebrlties=>{
        res.render("celebrities", {celebrlties:celebrlties})
    })
});

/* show a celebrtity*/
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

router.get('/celebrities/:id/edit', (req, res, next) => {
  Celebrity.findOne({_id: req.query.id})
  .then(celebrities=> {
    res.render("edit", {celebrities})
   
  })
  .catch((error) => {
    console.log(error)
  })
});

router.post('/celebrities/:id', (req, res, next) => {
  const { name, occupation, catchPhrase} = req.body;
  Celebrity.update({_id: req.query.id}, { $set: {name, occupation, catchPhrase }})
  .then((celebrity) => {
    res.redirect('/celebrities')
  })
  .catch((error) => {
    console.log(error)
  })
});



module.exports = router;