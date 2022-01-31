const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../model/user');
const { createConnection } = require('../utils/google-utils');

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    });
}

exports.googleLogin = asyncHandler(async(req, res, next) => {
  const { tokenId } = req.body;
  
  const auth = createConnection();
  const response = await auth.verifyIdToken({
    idToken: tokenId,
    audience: process.env.GOOGLE_CLIENT_ID
  })
  const { email_verfied, email } = await response.payload;
  if({email_verfied}) {
    const user = await User.findOne({email: email.toLowerCase()});
    const secret = process.env.JWT_SECRET;
    if(user) {
      // create token
      sendTokenResponse(user, 200, res);
    } else {
      const password = email + secret;
      const user = await User.create({
        email: email.toLowerCase(),
        password: password,
        wallet: ''
      });

      sendTokenResponse(user, 200, res);
    }
  }
})

exports.register = asyncHandler(async(req, res, next) => {
  const {email, password, wallet} = req.body;
  const existingEmail = await User.findOne({email: email.toLowerCase()});
  const existingWallet = await User.findOne(wallet);
  if(existingEmail) return next(new ErrorResponse('Email already registered!', 400)); 
  if(existingWallet) return next(new ErrorResponse('Wallet already registered!', 400)); 

  const user = await User.create({
    email: req.body.email.toLowerCase(),
    password,
    wallet,
  })

  res.status(200).json({
    success: true,
    data: 'Successfully Registered'
  })
})

exports.login = asyncHandler(async(req, res, next) => {
  const {email, password} = req.body;
  // validate phone & password
  if(!email || !password) {
    return next(new ErrorResponse('Please provide a phone and password', 400));
  }
  // check for user
  const user = await User.findOne({email: email.toLowerCase()}).select('+password');
  if(!user) {
    return next(new ErrorResponse('Invalid credentials', 400));
  }
  // check if password match
  const isMatch = await user.matchPassword(password);

  if(!isMatch) {
    return next(new ErrorResponse('Email or Password is not correct', 400));
  }
  // create token
  sendTokenResponse(user, 200, res);
})

exports.profile = asyncHandler(async(req, res, next) => {
  const user =  await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

exports.forgetPassword = asyncHandler(async(req, res, next) => {})