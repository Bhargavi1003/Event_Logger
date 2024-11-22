const crypto = require("crypto");

function computeHash(data) {
  const hash = crypto.createHash("sha256");
  hash.update(JSON.stringify(data));
  return hash.digest("hex");
}

module.exports = { computeHash };
