const { checkAddress } = require("@polkadot/util-crypto");

function isAddress(address) {
  const check = checkAddress(address, 42);
  if (check[0]) {
    return true;
  } else {
    return false;
  }
}

module.exports = { isAddress };