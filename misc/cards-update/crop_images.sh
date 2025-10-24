#!/bin/bash

DIR="../../frontend/public/images/cards/en-EN/*.jpg"

for i in $DIR; do
    h=$(identify -format "%h" "$i")
    if [ "$h" = "544" ]; then
        convert $i -gravity center -crop 358x500+0+0 $i &
    fi
done
