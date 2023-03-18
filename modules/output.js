function output(_content, _mask) {

    //Create the mask as image
    var img = createImage(_mask.width, _mask.height);
    img.copy(_mask, 0, 0, _mask.width, _mask.height, 0, 0, _mask.width, _mask.height);
    img.loadPixels();
    for (var i = 0; i < img.pixels.length; i += 4) {
        var v = img.pixels[i];
        img.pixels[i] = 0;
        img.pixels[i + 1] = 0;
        img.pixels[i + 2] = 0;
        img.pixels[i + 3] = 255 - v;
    }
    img.updatePixels();

    //convert _content from pg to image
    var contentImg = createImage(_content.width, _content.height);
    contentImg.copy(_content, 0, 0, _content.width, _content.height, 0, 0, _content.width, _content.height);
    contentImg.mask(img)
    return contentImg;
}
