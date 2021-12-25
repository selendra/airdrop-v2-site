#!/bin/bash
cd $HOME/api && npm install > /tmp/npm.log
cd $HOME/api && pm2 restart selendra-airdrop-v2 > /tmp/selndra-airdrop-v2.log
cd $HOME/client && npm install -g serve > /tmp/npm.log
cd $HOME/client && serve -s build > /tmp/npm.log