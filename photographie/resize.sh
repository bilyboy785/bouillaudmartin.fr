#!/bin/bash
THUMBS_DIR="./images/thumbs"
FULL_DIR="./images/fulls"

for IMAGE in $(ls ./images/optimizing)
do
    echo "Working thumbs for ${IMAGE}"
    convert -resize 30% ./images/optimizing/${IMAGE} ${THUMBS_DIR}/${IMAGE}
    cwebp -quiet -q 75 ./images/optimizing/${IMAGE} -o ${THUMBS_DIR}/${IMAGE}.webp
    convert -quality 75 ./images/optimizing/${IMAGE} ${THUMBS_DIR}/${IMAGE}.avif
    echo "Working fulls for ${IMAGE}"
    convert -resize 60% ./images/optimizing/${IMAGE} ${FULL_DIR}/${IMAGE}
    cwebp -quiet -q 80 ./images/optimizing/${IMAGE} -o ${FULL_DIR}/${IMAGE}.webp
    convert -quality 80 ./images/optimizing/${IMAGE} ${FULL_DIR}/${IMAGE}.avif
    echo "Cleaning optimizing directory"
    rm -f ./images/optimizing/${IMAGE}
    cat ./template_picture | sed "s/MYIMG/${IMAGE}/g" >> /tmp/template
done

cat /tmp/template
rm -f /tmp/template
