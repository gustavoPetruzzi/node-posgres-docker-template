#!/bin/bash
set -e

curl -X POST \
     --data  '{ data: "gustavo" }' \ 
     -H 'x-api-key: "unvalor"' \
     http://localhost:3002/
