#!/bin/bash
cd api && npm install > /tmp/yarn.log
cd api && pm2 restart selendra-airdrop-v2 > /tmp/selndra-airdrop-v2.log
cd interface && npm install -g serve
cd interface && serve -s build