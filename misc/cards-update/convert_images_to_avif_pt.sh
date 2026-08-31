#!/bin/sh


cd ../../frontend/public/images/cards/

for folder in playtest
do
    cd "$folder"
    for image in $(find . -type f -name '*.jpg' -print)
    do
        dir=$(dirname "$image")
        filename=$(basename "$image" .jpg).avif
        avifenc -q 70 -s 6 "$image" "$dir/$filename" > /dev/null 2>&1 &
    done
    cd ..
done
