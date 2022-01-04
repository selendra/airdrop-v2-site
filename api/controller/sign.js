const Web3 = require("web3");
const { soliditySha3 } = require("web3-utils");
const asyncHandler = require("../middleware/async");
const Whitelist = require("../model/whitelist-signed");
const ErrorResponse = require("../utils/errorResponse");

exports.getSigned = asyncHandler(async(req, res, next) => {
  const privateKey = process.env.PRIVATE_KEY;
  const candidate = req.body.wallet.toLowerCase();
  const currentDate = Date.now();
  const expiredAt = currentDate + (1 * 3600000) // 1 hour

  if(req.user.wallet !== candidate) return next(new ErrorResponse('Wrong Address!', 400));

  const Signed = await Whitelist.findOne({user: req.user.id});  
  if(!Signed) {
    const value = '5000000000000000000';
    const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
      
    const h = soliditySha3(value, candidate, expiredAt);
    const sig = await web3.eth.accounts.sign(h, privateKey);
  
    const candidateInfo = await Whitelist.create({
      hash: h,
      amount: value,
      Date: expiredAt,
      v: sig.v,
      r: sig.r,
      s: sig.s,
      user: req.user.id
    });
    
    return res.status(200).json({
      success: true,
      data: candidateInfo
    })
  } else {
    const Date = Number(Signed.Date);
    const expired = Date < currentDate;
    if(expired) {
      if(Signed.attempt <= 1) {
        const value = '2000000000000000000';
        const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
          
        const h = soliditySha3(value, candidate, expiredAt);
        const sig = await web3.eth.accounts.sign(h, privateKey);

        const updatedSigned = await Whitelist.findOneAndUpdate(Signed._id,
          {
            hash: h,
            amount: value,
            Date: expiredAt,
            v: sig.v,
            r: sig.r,
            s: sig.s,
            attempt: 2
          }, 
          { new: true, runValidators: true }
        );

        console.log(updatedSigned)

        return res.status(200).json({
          success: true,
          data: updatedSigned
        })
      } else {
        return res.status(200).json({
          success: true,
          data: Signed
        })
      }
    }
    if(Date < currentDate) {
      return res.status(200).json({
        success: true,
        data: Signed
      })
    }
  }
})