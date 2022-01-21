const asyncHandler = require("../middleware/async");
const Whitelist = require("../model/whitelist-signed");
const User = require("../model/user");
const ErrorResponse = require("../utils/errorResponse");
const { getSign } = require("../utils/getSign");

exports.getSigned = asyncHandler(async(req, res, next) => {
  const currentDate = Date.now();
  const privateKey = process.env.PRIVATE_KEY;
  const candidate = req.body.wallet.toLowerCase();
  const expiredAt = currentDate + (1 * 3600000); // 1 hour
  const registeredWallet = req.user.wallet.toLowerCase();
  const Signed = await Whitelist.findOne({user: req.user.id});  

  if(!Signed) {
    if(!registeredWallet) {
      const existingWallet = await User.findOne({wallet: candidate});
      if(existingWallet) return next(new ErrorResponse('Wallet already used!', 401)); 
  
      await User.findByIdAndUpdate(
        req.user.id, 
        { wallet: candidate },
        { new: true, runValidators: true }
      )
    }

    if(registeredWallet && (registeredWallet !== candidate)) return next(new ErrorResponse('Wrong Address!', 400));
    
    const value = '5000000000000000000';
    const sig = await getSign(value, candidate, expiredAt, privateKey);
  
    const candidateInfo = await Whitelist.create({
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
    if(registeredWallet !== candidate) return next(new ErrorResponse('Wrong Address!', 400));

    const Date = Number(Signed.Date);
    const expired = Date < currentDate;
    if(expired) {
      if(Signed.attempt <= 1) {
        const value = '2000000000000000000';
        const sig = await getSign(value, candidate, expiredAt, privateKey);

        const updatedSigned = await Whitelist.findOneAndUpdate(Signed._id,
          {
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
    if(!expired) {
      return res.status(200).json({
        success: true,
        data: Signed
      })
    }
  }
})