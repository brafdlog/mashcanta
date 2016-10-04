#!/bin/sh
NODE_ENV=production

# npm run clean

# Copy files that need to be deployed to the public folder
# cp dev-server/* public/

webpack -p --config webpack.production.config.js --progress --colors