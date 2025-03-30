target_path="../../frontend/public/images/cards/legacy"

for dir in crypt library
do
    for image in legacy-images/$dir/*.jpg
    do
        filename=$(basename "$image")
        convert "$image" -resize x500 "$target_path/$filename"
    done
done
