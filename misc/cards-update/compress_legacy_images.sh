#!/bin/sh

target_path="../../frontend/public/images/cards/legacy"

for dir in crypt library
do
    for image in legacy_images/$dir/*.jpg
    do
        filename=$(basename "$image" | uv run unidecode | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]//g' | sed 's/jpg$/.jpg/')
        convert "$image" -resize x500 "$target_path/$filename" &
    done
done
