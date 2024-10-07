for lang in en-EN es-ES fr-FR
do
    path="../../frontend/public/images/cards/$lang"
    for image in $path/*.jpg
    do
        filename=$(basename $image .jpg).webp
        convert $image -quality 40 $path/$filename
    done
done
