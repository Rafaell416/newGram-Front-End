var express = require('express');
var multer  = require('multer');
var ext = require('file-extension');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
})
 
var upload = multer({ storage: storage }).single('picture');

var app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index', { title: 'newGram' });
})

app.get('/signup', function (req, res) {
  res.render('index', { title: 'newGram|Signup' });
})

app.get('/signin', function (req, res) {
  res.render('index', { title: 'newGram|Signin' });
})

app.get('/api/pictures', function (req, res, next) {
  var pictures = [
    {
      user: {
        username: 'Rafaell416',
        avatar: 'apple-icon.png'
      },
      url: 'office.jpg',
      likes: 0,
      liked: false,
      createdAt: new Date().getTime()
    },
    {
      user: {
        username: 'Rafaell416',
        avatar: 'apple-icon.png'
      },
      url: 'office.jpg',
      likes: 1,
      liked: true,
      createdAt: new Date().setDate(new Date().getDate() - 10)
    }
  ];

  setTimeout(function () {
    res.send(pictures);  
  }, 1000)
});

app.post('/api/pictures', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.send(500, "Error uploading file");
    }
    res.send('File uploaded');
  })
})

app.listen(3000, function (err) {
  if (err) return console.log('There was an error'), process.exit(1);

  console.log('newGram listening at port  3000');
})