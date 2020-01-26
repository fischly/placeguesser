let cfg = require("../config.json");
const express = require("express");
const router = express.Router();
const getDb = require("../db").getDb;

function isEmailUsed(email) {
  const db = getDb();

  return new Promise((resolve, reject) => {
    db.query("SELECT email FROM public.users", (err, dbres) => {
      if (err) {
        console.log("DB ERROR: ", err);
        // res.status(400).send("There was a database error, sorry");
        reject("There was a database error, sorry");
        return;
      }
      console.log("result:", dbres);
      console.log("result:", dbres.rows);
      let success = dbres.rows.filter(row => row.email === email);

      console.log("sucessfull register rows with same email:", success);

      if (success.length > 0) {
        reject("Email is already in use, sorry");
        // res.status(200).json(success);
      } else {
        resolve(true);
      }
    });
  });
}

function registerUser() {
  const db = getDb();

  return new Promise((resolve, reject) => {});
}

router.post("/:email", (req, res) => {
  const db = getDb();

  // console.log('end');
  // res.status(200).json();
  // return;
  let email = req.params.email;
  let username = req.body.username;
  let password = req.body.password;
  let hash = 1337; // TODO: generate random hash

  isEmailUsed(email).then(
    isNotUsed => {
      db.query(`INSERT INTO public.users (username, password, salt, email) VALUES ('${username}', '${password}', '${hash}', '${email}')`, (err, dbres) => {
        // TODO: check for SQL injection and XSS + hash the password with random salt
        if (err) {
          console.log("DB ERROR: ", err);
          res.status(400).send("There was a database error, sorry");
          return;
        }

        res.status(200).send('success');
      });
    },
    isUsedError => {
      res.status(400).send(isUsedError);
    }
  );
  
  //TODO: get login parameters and check user identity
  // res.status(401).json({message: "login failed"}); // replace with your code
});

module.exports = router;
