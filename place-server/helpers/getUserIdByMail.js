const getDb = require("../db").getDb;

function getUserIdByEmail(email) {
  const db = getDb();

  // use parameterized queries to avoid sql injections
  const queryText = "SELECT user_id FROM public.users WHERE email = $1";
  const queryValues = [email];

  return new Promise((resolve, reject) => {
    db.query(queryText, queryValues, (err, dbres) => {
      if (err) {
        console.log("DB ERROR: ", err);
        reject("There was a database error, sorry");
        return;
      }

      if (dbres.rows.length > 0) {
        let result = dbres.rows[0];
        console.log("reuslting row: ", result);
        resolve(result.user_id);
      } else {
        reject("found no user with email " + email);
      }
    });
  });
}

module.exports = {
  getUserIdByEmail
};
