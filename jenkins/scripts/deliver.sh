#!/usr/bin/env sh

set +x
npm run build

pwd

rm -rf /var/www/jamkelley.com/*

cp -r build/* /var/www/jamkelley.com


