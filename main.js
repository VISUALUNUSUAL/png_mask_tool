let photo, maskShape;

let scrWidth, scrHeight, imgWidth, imgHeight;

let brushSize = 60;
let canvasScale = 100;

let scaleSlider;
let scaleFactor = 1;

//let maskContainer;

function preload() {
    photo = loadImage('assets/moonwalk.jpg');
}

function setup() {

    createCanvas(windowWidth, windowHeight);
    maskShape = new Mask(photo, scaleFactor);

    createUI();
}

function draw() {
    background(255);
    maskShape.over();
    maskShape.update();
    maskShape.resize(scaleSlider.value());
    maskShape.show();

    if (mouseIsPressed) {
        maskShape.pressed();
    }

//    maskShape.s = scaleSlider.value();
}


function mouseReleased() {
    maskShape.released();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
