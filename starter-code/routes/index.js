const express = require('express');
const router  = express.Router();

const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/celebrities', (req, res, next)=>{
  Celebrity.find()
  .then(celebrities => {
    res.render('celebrities/index', {celebrities});
  })
  .catch(err => {
    next(err);
  });
});

router.get('/celebrities/new', (req, res, next)=>{
  res.render('celebrities/new');
});

router.get('/movies', (req, res, next)=>{
  Movie.find()
  .populate('cast')
  .then(dbMovies => {
    res.render('movies/index', {movies: dbMovies});
  })
  .catch(err => {
    next(err);
  });
});

router.get('/movies/new', (req, res, next)=>{
  Celebrity.find()
    .then(celebrities => {
      res.render('movies/new', {celebrities});
    });
});

router.post('/movies', (req, res, next)=>{
  const {title, genre, plot, cast} = req.body;

  Movie.create({
    title, genre, plot, cast
  })
  .then(dbMovie => {
    console.log(`A movie named ${dbMovie.title} has been added to the database.`);
    res.redirect(`/movies`); //${dbMovie._id}
  })
  .catch(err=>{
    next(err);
  });
});

router.get('/movies/:id/edit', (req, res, next)=>{
  const id = req.params.id;
  Celebrity.find()
    .then(dbCelebrities => {
      Movie.findById(id)
      .then(movie => {
        dbCelebrities.forEach(celeb=>{
          celeb.selected = movie.cast.includes(celeb._id.toString());
        });
  
        res.render('movies/edit', {movie, cast: dbCelebrities});
      })
      .catch(err => {
        next(err);
      });
    });
});

router.post('/movies/:id/edit', (req, res, next)=>{
  const {title, genre, plot, cast} = req.body;
  const id = req.params.id;

  Movie.findByIdAndUpdate(id,{
    title, genre, plot, cast
  })
  .then(dbMovie => {
    console.log(`${dbMovie.title} has been added to the database.`);
    res.redirect(`/movies`);
  })
  .catch(err=>{
    next(err);
  });
});

router.post('/celebrities', (req, res, next)=>{
  const {name, occupation, catchPhrase} = req.body;
  Celebrity.create({
    name, occupation, catchPhrase
  })
  .then(newCeleb => {
    console.log(`${newCeleb.name} has been added to the database.`);
    res.redirect(`/celebrities/${newCeleb._id}`);
  })
  .catch(err=>{
    next(err);
  });
});

router.get('/celebrities/:id/edit', (req, res, next)=>{
  const id = req.params.id;
  Celebrity.findById(id)
  .then(celebrity => {
    res.render('celebrities/edit', {celebrity});
  })
  .catch(err => {
    next(err);
  });
});

router.post('/celebrities/:id/edit', (req, res, next)=>{
  const {name, occupation, catchPhrase} = req.body;
  const id = req.params.id;

  Celebrity.findByIdAndUpdate(id,{
    name, occupation, catchPhrase
  })
  .then(newCeleb => {
    console.log(`${newCeleb.name} has been added to the database.`);
    res.redirect(`/celebrities/${newCeleb._id}`);
  })
  .catch(err=>{
    next(err);
  });
});

router.post('/celebrities/:id/delete', (req, res, next)=>{
  const id = req.params.id;

  Celebrity.findByIdAndRemove(id)
  .then(deletedCeleb => {
    console.log(`${deletedCeleb.name} has been added to the database.`);
    res.redirect(`/celebrities`);
  })
  .catch(err=>{
    next(err);
  });
});

router.get('/celebrities/:id', (req, res, next)=>{
  const id = req.params.id;
  Celebrity.findById(id)
  .then(celebrity => {
    res.render('celebrities/details', {celebrity});
  })
  .catch(err => {
    next(err);
  });
});


module.exports = router;
