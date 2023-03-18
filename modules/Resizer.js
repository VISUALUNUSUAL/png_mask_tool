class Resizer {
    constructor(srcPhoto) {

        this.dragging = false; // Is the object being dragged?
        this.rollover = false; // Is the mouse over the ellipse?

        this.offsetX = 0;
        this.offsetY = 0;
        this.offsetW = 0;
        this.offsetH = 0;

        this.w = maxSize;
        this.h = maxSize;
        this.s = zoom;

        this.photo = srcPhoto;
        this.ratio = srcPhoto.width / srcPhoto.height;
        this.normalise(this.s);

        this.x = width / 2 - this.w / 2;
        this.y = height / 2 - this.h / 2;

    }

    reset() {
        if (this.ratio < 1) {
            this.w = Math.round(maxSize * this.ratio);
            this.h = Math.round(maxSize);

        } else {
            this.w = Math.round(maxSize);
            this.h = Math.round(maxSize / this.ratio);
        }
        this.x = width / 2 - this.w / 2;
        this.y = height / 2 - this.h / 2;
    }

    normalise(scl) {

        this.nw = this.w;
        this.nh = this.h;

        this.s = scl;

        if (this.ratio < 1) {
            this.w = Math.round(maxSize * this.ratio) * this.s;
            this.h = Math.round(maxSize) * this.s;

        } else {
            this.w = Math.round(maxSize) * this.s;
            this.h = Math.round(maxSize / this.ratio) * this.s;
        }

        this.x += (this.nw - this.w) / 2;
        this.y += (this.nh - this.h) / 2;

    }

    over() {
        // Is mouse over object
        if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
            this.rollover = true;
        } else {
            this.rollover = false;
        }
    }

    updateDrag() {
        if (appMode == 'Scale') {
            // Adjust location if being dragged
            if (this.dragging) {
                this.x = mouseX + this.offsetX;
                this.y = mouseY + this.offsetY;
            }
        }

    }

    show() {
//        stroke(0);
//        if (this.dragging) {
//            fill(50, 50);
//        } else if (this.rollover) {
//            fill(100, 50);
//        } else {
//            fill(175, 150);
//        }
        image(this.photo, this.x, this.y, this.w, this.h);
//        rect(this.x, this.y, this.w, this.h);


    }

    pressed() {
        // Did I click on the rectangle?
        if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
            this.dragging = true;
            this.offsetX = this.x - mouseX;
            this.offsetY = this.y - mouseY;
        }
    }

    released() {
        this.dragging = false;
    }

}
