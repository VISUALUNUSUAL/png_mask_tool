var brushColor;
var bgColor;
var drawSize;
var penStyle;

var paint;
var photo;
var zoom;

let buff_size;
let buff_w_scl;
let buff_h_scl;
let buff_width;
let buff_height;

function preload() {
    photo = loadImage('assets/photo_H.jpg');
}

function _(id) {
    return document.getElementById(id);
}

function setup() {

    zoom = 1;

    buff_size = min(innerWidth, innerHeight-250)
    ph_ratio = photo.width / photo.height;

    if (ph_ratio < 1) {
        buff_w_scl = 1 * ph_ratio * zoom;
        buff_h_scl = 1 * zoom;
    } else {
        buff_w_scl = 1 * zoom;
        buff_h_scl = 1 / ph_ratio * zoom;
    }

    buff_width = buff_size * buff_w_scl
    buff_height = buff_size * buff_h_scl

    pixelDensity(1);
    paint = createCanvas(buff_width, buff_height);
    //    paint.parent("mydiv");

    brushColor = '#f03e3e';
    bgColor = '#c8c8c8';
    drawSize = 50;
    penStyle = 'brush';

    image(photo, 0, 0, buff_width, buff_height)
}

function mouseDragged() {
    stroke(brushColor);
    strokeWeight(drawSize);
    if (penStyle === 'brush') {
        line(pmouseX, pmouseY, mouseX, mouseY);
    } else if (penStyle === 'zoom') {
        ellipse(mouseX, mouseY, drawSize, drawSize);
    }
}

function windowResized() {
    buff_size = min(innerWidth, innerHeight-250)
    buff_width = buff_size * buff_w_scl
    buff_height = buff_size * buff_h_scl
    resizeCanvas(buff_width, buff_height)
    //    buff.resizeCanvas(buff_width, buff_height)
    image(photo, 0, 0, buff_width, buff_height)
}
