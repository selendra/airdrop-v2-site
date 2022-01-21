const Web3 = require('web3');
const { soliditySha3 } = require('web3-utils');

exports.getSign = async (value, candidate, expiredAt, privateKey) => {
  const network = 'https://data-seed-prebsc-1-s1.binance.org:8545';

  const web3 = new Web3(network);
  const h = soliditySha3(value, candidate, expiredAt);
  const sig = await web3.eth.accounts.sign(h, privateKey);
  return sig;
}