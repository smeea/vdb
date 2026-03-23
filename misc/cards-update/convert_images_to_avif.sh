#!/bin/sh


cd ../../frontend/public/images/cards/

for folder in legacy playtest set en-EN es-ES fr-FR pt-PT
do
    cd "$folder"
    for image in $(find . -type f -name '*.jpg' -print)
    do
        dir=$(dirname "$image")
        filename=$(basename "$image" .jpg).avif
        avifenc -q 60 "$image" "$dir/$filename" > /dev/null 2>&1 &
    done
    cd ..
done
