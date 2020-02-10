let cfg = require('../config.json');
const express = require('express');
const router = express.Router();
const getDb = require('../db').getDb;
const jwt = require('jsonwebtoken');

const getUserIdByEmail = require('../helpers/getUserIdByMail').getUserIdByEmail;
const checkAuth = require('../helpers/checkAuth').checkAuth;

router.post('/:locid', (req, res) => {
  const db = getDb();

  const loc_id = req.params.locid;
  const authorization = req.header('Authorization');

  console.log('authorization: ', authorization);
  const token = checkAuth(authorization);

  if (!token) {
    res.status(400).json({ error: 'unauthorized' });
    return;
  }

  if (!loc_id || loc_id < 0) {
    res.status(400).json({ error: 'location id is invalid' });
    return;
  }

  const userEmail = token.email;

  getUserIdByEmail(userEmail).then(
    userId => {
      const queryText = 'INSERT INTO public.favorites (user_id, loc_id) VALUES ($1, $2)';
      const queryValues = [userId, loc_id]; // parameterized query to avoid sql injections

      db.query(queryText, queryValues, (err, dbres) => {
        if (err) {
          console.error('database error while inserting favorite:', err);
          res.status(400).json({ error: err });
          return;
        }

        res.status(200).json({
          message: 'added to favorites',
          userId: userId,
          locid: loc_id
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
