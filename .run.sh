#!/bin/bash
cd api && yarn install > /tmp/yarn.log
cd api && pm2 restart selendra-airdrop-v2 > /tmp/selndra-airdrop-v2.log