const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity');

mongoose.connect('mongodb://localhost/celebrities', {
  useNewUrlParser: true
});

const data = [
  {
    name: 'Bruce Willis',
    occupation: 'Actor',
    catchPhrase: 'Yippee-ki-yay, Motherfucker'
  },
  {
    name: 'Arnold Schwarzenegger',
    occupation: 'Actor',
    catchPhrase: 'Hasta la vista, baby'
  },
  {
    name: 'Elvis Costello',
    occupation: 'Singer / Songwriter',
    catchPhrase: 'Did anybody see my red shoes?'
  },
];

Celebrity.insertMany(data)
  .then(res => {
    console.log(res);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });