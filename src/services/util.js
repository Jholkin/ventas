const jwt = require("jsonwebtoken");
const moment = require("moment");

exports.createToken = function () {
  let payload = {
    sub: "static",
    iat: moment().unix(),
    exp: moment().add(14, "days").unix(),
  };
  return jwt.sign(payload, `clavesecreta`);
};

exports.validatedToken = function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader != "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    jwt.verify(req.token, `clavesecreta`, (err, data) => {
      if (err) {
        res.status(403).json({ error: "Unauthorized" });
      } else {
        console.log("Access successful");
        next();
      }
    });
  } else {
    res.status(403).json({ error: "Token not found" });
  }
};
