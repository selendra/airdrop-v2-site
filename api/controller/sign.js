const Web3 = require("web3");
const { soliditySha3 } = require("web3-utils");
const asyncHandler = require("../middleware/async");
const user = require("../model/user");
const Whitelist = require("../model/whitelist-signed");
const ErrorResponse = require("../utils/errorResponse");

exports.getSigned = asyncHandler(async(req, res, next) => {
  const Signed = await Whitelist.findOne({user: req.user.id});
  if(Signed) {
    res.status(200).json({
      success: true,
      data: Signed
    })
  }
  if(!Signed) {
    const candidate = req.body.wallet;
    const value = '50000000000000000000';
    const expiredAt = Date.now() + (15 * 86400000); // 15 day
    const privateKey = process.env.PRIVATE_KEY;
  
    if(req.user.wallet !== candidate) {
      // console.log(candidate, req.user.wallet)
      return next(new ErrorResponse('Wrong Address!', 400));
    }

    const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
    
    const h = soliditySha3(
      value,
      candidate,
      expiredAt
    );
  
    const sig = await web3.eth.accounts.sign(h, privateKey);
    // console.log(sig);
  
    const candidateInfo = await Whitelist.create({
      hash: h,
      amount: value,
      expiredAt: expiredAt,
      v: sig.v,
      r: sig.r,
      s: sig.s,
      user: req.user.id
    });
    
    res.status(200).json({
      success: true,
      data: candidateInfo
    })
  }
})