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
  res.render('index', { title: 'newGram - Signup' });
})

app.get('/signin', function (req, res) {
  res.render('index', { title: 'newGram - Signin' });
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
  }, 2000)
});

app.post('/api/pictures', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.send(500, "Error uploading file");
    }
    res.send('File uploaded');
  })
})

app.get('/api/user/:username', (req, res) => {
  const user = {
    username: 'newGram',
    avatar: 'apple-icon.png',
    pictures: [
      {
        id: 1,
        src: 'https://platzi.com/blog/wp-content/uploads/2015/03/rethinkdb.jpg',
        likes: 3
      },
      {
        id: 2,
        src: 'js.jpeg',
        likes: 1
      },
      {
        id: 3,
        src: 'public/android.png',
        likes: 10
      },
      {
        id: 4,
        src: 'node.png',
        likes: 0
      },
      {
        id: 5,
        src: 'npm.png',
        likes: 23
      },
      {
        id: 6,
        src: 'octocat.jpeg',
        likes: 11
      }
    ]
  }

  res.send(user);
})

app.get('/:username', function (req, res) {
  res.render('index', { title: `newGram - ${req.params.username}` });
})

app.get('/:username/:id', function (req, res) {
  res.render('index', { title: `newGram - ${req.params.username}` });
})

app.listen(3000, function (err) {
  if (err) return console.log('There was an error'), process.exit(1);

  console.log('newGram listening at port 3000');
})