let cfg = require('../config.json');

const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const getDb = require('../db').getDb;
const jwt = require('jsonwebtoken');

const getSaltByEmail = require('../helpers/getSaltByMail').getSaltByEmail;
const hashPassword = require('../helpers/hashPassword').hashPassword;

router.post('/:email/:pass', (req, res) => {
  const db = getDb();

  // console.log('end');
  // res.status(200).json();
  // return;
  const email = req.params.email;
  const pass = req.params.pass;

  console.log(`Got login try from email ${email} with password ${pass}.`);

  getSaltByEmail(email).then(
    salt => {
      const hashedPassword = hashPassword(pass, salt);

      const queryText = 'SELECT * FROM public.users WHERE email = $1 and password = $2';
      const queryValues = [email, hashedPassword];

      db.query(queryText, queryValues, (err, dbres) => {
        if (err) {
          console.log('ERROR: ', err);
          res.status(400).send('There was a database error, sorry');
          // res.send('There was a database error, sorry');
          return;
        }
        console.log('result:', dbres.rows);
        let success = dbres.rows.length > 0;

        console.log('sucessfull login rows:', success);

        if (success) {
          let token = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // expires in 7 days
              email: email
            },
            'testtokenpw' /* pass */
          ); // TODO: use user password
          res.status(200).send(token);
        } else {
          res.status(401).send('Wrong credentials, sorry');
        }
      });
    },
    error => {
      res.status(401).send('wrong credentials');
      return;
    }
  );

  // public.users (id, first_name, last_name, email, password, token)
//   db.query('SELECT * FROM public.users', (err, dbres) => {
//     if (err) {
//       console.log('ERROR: ', err);
//       res.status(400).send('There was a database error, sorry');
//       // res.send('There was a database error, sorry');
//       return;
//     }
//     console.log('result:', dbres);
//     console.log('result:', dbres.rows);
//     // TODO: implement hashes with salt
//     let success = dbres.rows.filter(row => row.email === email && row.password === pass);

//     console.log('sucessfull login rows:', success);

//     if (success.length > 0) {
//       let token = jwt.sign(
//         {
//           exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // expires in 7 days
//           email: email
//         },
//         'testtokenpw' /* pass */
//       ); // TODO: use user password
//       res.status(200).send(token);
//       // res.status(200).text('found');
//     } else {
//       res.status(401).send('Wrong credentials, sorry');
//     }

//     // console.log('RESULTS:', dbres.rows);
//     // res.status(200).json(dbres.rows);
//     // res.json(res.rows);
//     // res.send('success');
//     // client.end();
//     // return;
//   });

  //TODO: get login parameters and check user identity
  // res.status(401).json({message: "login failed"}); // replace with your code
});

module.exports = router;
