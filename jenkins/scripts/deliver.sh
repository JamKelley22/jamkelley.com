#!/usr/bin/env sh

set +x
npm run build

npm start &
echo $! > .pidfile
