const jwt = require("jsonwebtoken");

function checkAuth(authorization) {
  if (!authorization) {
    console.error("no authorization header");
    return null;
  }

  let isValid = jwt.verify(authorization, "testtokenpw");
  console.log("is valid: ", isValid);

  // check flags
  if (!isValid || !isValid.exp || !isValid.email) {
    console.error("could not parse token or find exp or email flag in token");
    return null;
  }

  // check expiration date
  if (isValid.exp * 1000 < Date.now()) {
    console.error("token expired");
    // res.status(401).json({ error: "authorization expired" });
    return null;
  }

  return isValid;
}

module.exports = {
    checkAuth
};
