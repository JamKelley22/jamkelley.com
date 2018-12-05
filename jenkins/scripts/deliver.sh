#!/usr/bin/env sh

set +x
npm run build

cp -r build/ /var/www/jamkelley.com
