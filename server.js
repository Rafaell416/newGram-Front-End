var express = require('express');

var app = express();

app.listen(3000, function (err) {
  if (err) return console.log('There was an error'), process.exit(1);

  console.log('newGram listening at port 3000');
})

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index', { title: 'newGram-Home' });
})

app.get('/signup', function (req, res) {
  res.render('index', { title: 'newGram-Signup' });
})

app.get('/signin', function (req, res) {
  res.render('index', { title: 'newGram-Login' });
})

