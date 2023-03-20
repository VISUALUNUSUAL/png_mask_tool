class Mask {
    constructor(resizer) {

        this.photo = resizer;

        this.x = this.photo.x;
        this.y = this.photo.y;
        this.w = Math.round(this.photo.w);
        this.h = Math.round(this.photo.h);
        this.buff = createGraphics(this.w, this.h);
        this.tempBuffer = createGraphics(this.w, this.h);
    }

    update() {
        this.x = this.photo.x;
        this.y = this.photo.y;
        this.w = Math.round(this.photo.w);
        this.h = Math.round(this.photo.h);
    }

    initMode() {
        if (appMode == 'Scale') {
            this.tempBuffer = createImage(this.w, this.h);
            this.tempBuffer.copy(this.buff, 0, 0, this.buff.width, this.buff.height, 0, 0, this.tempBuffer.width, this.tempBuffer.height);
        }
        if (appMode == 'Brush') {
            // create new main buffer with  size of temp buffer
            this.buff = createGraphics(this.w, this.h);
            // Copy temp buffer into main buffer with new dimensions
            this.buff.copy(this.tempBuffer, 0, 0, this.w, this.h, 0, 0, this.w, this.h);
        }
    }

    reset() {
        this.tempBuffer = createImage(this.w, this.h);
        this.buff = createGraphics(this.w, this.h)
    }

    updateScale() {
        this.tempBuffer.resize(this.w, this.h);
    }

    drawMask() {
        this.buff.noStroke();
        this.buff.fill(255);
        this.buff.ellipse(mouseX - this.x, mouseY - this.y, brushSize);
    }

    show() {
        if (appMode == 'Scale') {
            image(this.tempBuffer, this.x, this.y, this.w, this.h);
        }
        if (appMode == 'Brush') {
            if (mouseIsPressed) {
                this.drawMask();
            }
            push();
            tint(255, 0, 0, 127);
            image(this.buff, this.x, this.y, this.w, this.h);
        
            pop();
        }
    }
}
