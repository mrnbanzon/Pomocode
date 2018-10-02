if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { gitCodeURL, gitToken, gitQuery } = require('../utils/github');

const { HOST, PORT } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set session in place
app.use(
  session({
    secret: 'gitPomocode',
    resave: false,
    saveUninitialized: true,
  }),
);

// CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

// serve the front-end app. (May not need if serving from Webpack...)
app.use(express.static(path.join(__dirname, '/../dist')));

/* --GITHUB API & AUTHENTICATION-- */
// check if in session
app.get('/session', (req, res) => {
  const token = req.session.token || null;
  res.send({ token });
});

// retrieve code from github
app.get('/login', (req, res) => {
  res.redirect(gitCodeURL);
});

// retrieve token from github
app.get('/token', (req, res) => {
  gitToken(req.query.code)
    .then((token) => {
      req.session.token = token;
      res.redirect('/');
    })
    .catch(() => {
      res.redirect('/');
    });
});

// query github API v4(GraphQL)
app.post('/query', (req, res) => {
  gitQuery(req.body.token, req.body.query)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

/* --DB QUERY ENDPOINT(S)-- */

app.listen(PORT, () => {
  console.log(`Listening on http://${HOST}:${PORT}`);
});
