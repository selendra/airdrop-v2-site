#!/bin/bash
cd api && npm install > /tmp/npm.log
cd api && pm2 restart selendra-airdrop-v2 > /tmp/selndra-airdrop-v2.log
cd client && npm install -g serve > /tmp/npm.log
cd client && serve -s build > /tmp/npm.log