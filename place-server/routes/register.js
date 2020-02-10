let cfg = require('../config.json');
const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const getDb = require('../db').getDb;
const hashPassword = require('../helpers/hashPassword').hashPassword;

function isEmailUsed(email) {
  const db = getDb();

  return new Promise((resolve, reject) => {
    const queryText = 'SELECT email FROM public.users WHERE email = $1';
    const queryValues = [email]; // parameterized query to avoid sql injections

    db.query(queryText, queryValues, (err, dbres) => {
      if (err) {
        console.log('DB ERROR: ', err);
        // res.status(400).send("There was a database error, sorry");
        reject('There was a database error, sorry');
        return;
      }
      // console.log('result:', dbres);
      console.log('result:', dbres.rows);
      // let success = dbres.rows.filter(row => row.email === email);
      let emailFound = dbres.rows.length > 0;

      if (emailFound) {
        reject('Email is already in use, sorry');
        // res.status(200).json(success);
      } else {
        resolve(true);
      }
    });
  });
}

// function hashPassword(password, salt) {
//   let hash = crypto.createHmac('sha512', salt); // create hashing function
//   hash.update(password);
//   let hashedPassword = hash.digest('hex');

//   return hashedPassword;
// }

// MAIN ROUTE: register
router.post('/', (req, res) => {
  const db = getDb();

  // console.log('end');
  // res.status(200).json();
  // return;
  let email = req.body.email;
  let username = req.body.user;
  let password = req.body.pass;
  let salt = crypto.randomBytes(16).toString('base64'); // generate random salt text
  console.log('registering, email =', email, 'username: ', username, 'password', password);
  // hash the given password

  isEmailUsed(email).then(
    isNotUsed => {
      const hashedPassword = hashPassword(password, salt);
      console.log('hashed pw: ', hashedPassword);

      const queryText =
        'INSERT INTO public.users (username, password, salt, email) VALUES ($1, $2, $3, $4)';
      const queryValues = [username, hashPassword(password, salt), salt, email];

      db.query(queryText, queryValues, (err, dbres) => {
        // TODO: check for SQL injection and XSS + hash the password with random salt
        if (err) {
          console.log('DB ERROR: ', err);
          res.status(400).send('There was a database error, sorry');
          return;
        }

        // res.status(200).send('successfully registered');
        res.status(200).send('registered');
      });
    },
    isUsedError => {
      res.status(400).send(isUsedError);
    }
  );
});

module.exports = router;
