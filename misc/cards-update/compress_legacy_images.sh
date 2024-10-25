src_path="../legacy-images"
target_path="../../frontend/public/images/cards/legacy"

for image in $src_path/*.jpg
do
    filename=$(basename "$image")
    convert "$image" -resize x500 "$target_path/$filename"
done
