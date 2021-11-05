#!/bin/bash

#build output to openresty folder
npm run build-production
cp -r dist/* /usr/local/openresty/nginx/html

# Run OpenResty in foreground
openresty -g 'pcre_jit on; daemon off;'
