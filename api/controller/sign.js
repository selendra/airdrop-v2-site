const asyncHandler = require("../middleware/async");
const Whitelist = require("../model/whitelist-signed");
const User = require("../model/user");
const ErrorResponse = require("../utils/errorResponse");
const { WsProvider, ApiPromise, Keyring } = require('@polkadot/api');
const { isAddress } = require("../utils/validateAddress");

function getTimestamp(date) {
  const myDate = new Date(date);
  return myDate.getTime();
}

async function sendSubstrateToken(address, amount) {
  try {
    const ws = new WsProvider(process.env.WS_PROVIDER);
    const api = await ApiPromise.create({ provider: ws });

    const keyring = new Keyring({ 
      type: process.env.KEY_RING_TYPE, 
      ss58Format: process.env.KEY_RING_SS58_FORMAT 
    });
    const account = keyring.addFromMnemonic(process.env.MNEMONIC);

    const parsedAmount = BigInt(amount * Math.pow(10, api.registry.chainDecimals));
    console.log(`Sending ${amount} SEL to ${address}`);
    const transfer = api.tx.balances.transfer(address, parsedAmount);
    const hash = await transfer.signAndSend(account);
    console.log("Transfer sent with hash", hash.toHex());
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Something went wrong!'
    })
  }
}

exports.exeSendSubstrate = asyncHandler(async(req, res, next) => {
  const candidate = req.body.wallet;
  const registeredWallet = req.user.wallet;
  const whitelist = await Whitelist.findOne({ user: req.user.id });
  const currentDate = Date.now();
  const eventEnded = 1648573200000; // 30/03/2022

  if(!isAddress(candidate)) return next(new ErrorResponse('Wallet is not correct!', 401)); 

  if(whitelist) {
    const { _id, attempt, updatedAt } = whitelist;
    const nextClaim = getTimestamp(updatedAt) + (60 * 60 * 1000) // (15 * 24 * 60 * 60 * 1000)  // updatedAt + 15day
    // console.log(nextClaim, getTimestamp(updatedAt));
    // console.log(nextClaim < currentDate);

    if(attempt < 3 && nextClaim < currentDate) {
      if(currentDate < eventEnded) {
        await sendSubstrateToken(candidate, '50');
        await Whitelist.findOneAndUpdate(_id, { attempt: attempt + 1 });
        return res.status(200).json({
          success: true
        })
      } else {
        return res.status(401).json({
          success: false,
          error: 'Airdrop finished. Hope to see you next time!'
        })
      }
    } else {
      return res.status(401).json({
        success: false,
        error: 'You had already claim the airdrop!'
      })
    }
  } else {
    if(!registeredWallet) {
      const existedWallet = await User.findOne({wallet: candidate});
      if(existedWallet) return next(new ErrorResponse('Wallet is already used!', 401)); 
      await User.findByIdAndUpdate(
        req.user.id, 
        { wallet: candidate },
        { new: true, runValidators: true }
      )
    }
    if(registeredWallet && (registeredWallet !== candidate)) return next(new ErrorResponse('Wrong wallet address!', 400));

    await sendSubstrateToken(candidate, '50');
    await Whitelist.create({
      amount: '50',
      user: req.user.id
    });

    return res.status(200).json({
      success: true,
    })
  }
})