#!/usr/bin/env sh

set +x
npm run build

rm -rf /var/www/jamkelley.com/build

cp -r build/ /var/www/jamkelley.com
