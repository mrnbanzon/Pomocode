if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const path = require('path');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

const { HOST, PORT } = process.env;
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = require('../config.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

// serve the front-end app. (May not need if serving from Webpack...)
app.use(express.static(path.join(__dirname, '/../dist')));

// for github authentication, exchange code for token
app.get('/githubToken', (req, res) => {
  axios
    .post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: req.query.code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    )
    .then(({ data }) => {
      console.log('Token:', data.access_token);
      res.send(data.access_token);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

app.listen(PORT, () => {
  console.log(`Listening on http://${HOST}:${PORT}`);
});
