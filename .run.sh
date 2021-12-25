#!/bin/bash
cd $HOME/api && npm install > /tmp/npm.log
cd $HOME/api && pm2 restart selendra-airdrop-v2-api > /tmp/selndra-airdrop-v2.log
cd $HOME/client && npm install -g serve > /tmp/npm.log
cd $HOME/client && pm2 restart selendra-airdrop-v2-client > /tmp/npm.log