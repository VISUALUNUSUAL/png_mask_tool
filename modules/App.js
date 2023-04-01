class Mask {
    constructor(srcPhoto, maxSize) {
        this.rollover = false; // Is the mouse over the area?\
        this.srcPhoto = srcPhoto;
        this.ratio = srcPhoto.width / srcPhoto.height;
        this.maxSize = maxSize;
        this.scale = 1;

        this.w = this.maxSize;
        this.h = this.maxSize;
        this.x = width / 2 - this.w / 2;
        this.y = height / 2 - this.h / 2;

        this.updSize(this.scale);

        this.photo = createImage(this.w, this.h);
        this.photo.copy(this.srcPhoto, 0, 0, srcPhoto.width, srcPhoto.height, 0, 0, this.w, this.h);

        this.mask = createGraphics(this.w, this.h);
        this.tmask = createImage(this.w, this.h);
    }

    appMode(appMode) {
        if (appMode == 'Scale') {
            this.tmask = createImage(this.w, this.h);
            this.tmask.copy(this.mask, 0, 0, this.w, this.h, 0, 0, this.w, this.h);

        } else {
            this.mask = createGraphics(this.w, this.h);
            this.mask.copy(this.tmask, 0, 0, this.tmask.width, this.tmask.height, 0, 0, this.w, this.h);
        }
    }

    updPos() {
        this.x += (this.pw - this.w) / 2;
        this.y += (this.ph - this.h) / 2;

        if (this.dragging) {
                this.x = mouseX + this.offsetX;
                this.y = mouseY + this.offsetY;
        }
    }

    updSize(s) {
        this.scale = s;
        this.pw = this.w;
        this.ph = this.h;

        if (this.ratio < 1) {
            this.w = Math.round(this.maxSize * this.ratio * this.scale);
            this.h = Math.round(this.maxSize * this.scale);
        } else {
            this.w = Math.round(this.maxSize * this.scale);
            this.h = Math.round(this.maxSize / this.ratio * this.scale);
        }
        this.updPos();
    }

    pressed() {
        if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
            if (appMode == 'Scale') {
                this.dragging = true;
                this.offsetX = this.x - mouseX;
                this.offsetY = this.y - mouseY;
                

            } else {
                this.brushSize = brushSize;
                this.mask.stroke(240, 62, 62);
                this.mask.strokeWeight(this.brushSize);
                this.mask.line(pmouseX - this.x, pmouseY - this.y, mouseX - this.x, mouseY - this.y, );
            }
        }
    }
    released() {
        this.dragging = false;
    }

    show() {
        image(this.photo, this.x, this.y, this.w, this.h);
//         push();
//         tint(255,0,0,150);
        if (appMode == 'Scale') {
            image(this.tmask, this.x, this.y, this.w, this.h);
        } else {
            image(this.mask, this.x, this.y, this.w, this.h);
        }
//         noTint();
//         pop();
    }
    
    output(_content, _mask) {
        //Create the mask as image
        var img = createImage(_mask.width, _mask.height);
        img.copy(_mask, 0, 0, _mask.width, _mask.height, 0, 0, _mask.width, _mask.height);
        img.loadPixels();
        for (var i = 0; i < img.pixels.length; i += 4) {
            var v = img.pixels[i];
            if (v > 0) v = 255;
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
    
    save() {
        let result = this.output(this.srcPhoto, this.mask);
        result.save('OutputImage', 'png');
    }

    reset() {
        this.updSize(1);
        this.mask = createGraphics(this.w, this.h);
        this.tmask = createImage(this.w, this.h);
        this.x = width / 2 - this.w / 2;
        this.y = height / 2 - this.h / 2;
    }


}
