let cfg = require('../config.json');
const express = require('express');
const router = express.Router();
const getDb = require('../db').getDb;
const jwt = require('jsonwebtoken');

const getUserIdByEmail = require('../helpers/getUserIdByMail').getUserIdByEmail;
const checkAuth = require('../helpers/checkAuth').checkAuth;

router.post('/', (req, res) => {
  const db = getDb();

  const authorization = req.header('Authorization');

  console.log('authorization: ', authorization);
  const token = checkAuth(authorization);

  if (!token) {
    res.status(400).json({ error: 'unauthorized' });
    return;
  }

  const userEmail = token.email;

  getUserIdByEmail(userEmail).then(
    userId => {
      const queryText = 'SELECT loc_id FROM public.favorites WHERE user_id = $1';
      const queryValues = [userId]; // parameterized query to avoid sql injections

      db.query(queryText, queryValues, (err, dbres) => {
        if (err) {
          console.error('database error while getting favorite:', err);
          res.status(400).json({ error: err });
          return;
        }

        console.log('getFavs:', dbres.rows);
        res.status(200).json({
          message: 'fetched favorites',
          userId: userId,
          favs: dbres.rows
        });
        return;
      });
    },
    err => {
      console.error('could not find user with email ' + userEmail);
      res.status(401).json({ error: 'could not find user with email ' + userEmail });
      return;
    }
  );
});

module.exports = router;
