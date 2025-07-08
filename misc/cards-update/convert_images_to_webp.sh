#!/bin/sh

#for folder in legacy
for folder in legacy en-EN es-ES fr-FR pt-PT playtest legacy
do
    path="../../frontend/public/images/cards/$folder"
    for image in $path/*.jpg
    do
        filename=$(basename "$image" .jpg).webp
        convert "$image" -quality 40 "$path/$filename"
    done
done
