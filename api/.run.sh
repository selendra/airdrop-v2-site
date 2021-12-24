#!/bin/bash
yarn install > /tmp/yarn.log
pm2 restart selendra-airdrop-v2 > /tmp/selndra-airdrop-v2.log