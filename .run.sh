#!/bin/bash
cd $HOME/selendra-airdrop/api && npm install > /tmp/npm.log
cd $HOME/selendra-airdrop/api && pm2 restart selendra-airdrop-v2-api > /tmp/selndra-airdrop-v2.log
cd $HOME/selendra-airdrop/client && pm2 restart selendra-airdrop-v2-client > /tmp/npm.log