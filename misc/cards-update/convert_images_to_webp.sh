#!/bin/sh


cd ../../frontend/public/images/cards/

for folder in legacy playtest set en-EN es-ES fr-FR pt-PT
do
    cd "$folder"
    for image in $(find . -type f -name '*.jpg' -print)
    do
        dir=$(dirname "$image")
        filename=$(basename "$image" .jpg).webp
        convert "$image" -quality 40 "$dir/$filename"
    done
done
