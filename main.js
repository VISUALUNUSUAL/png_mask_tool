// Graphics
let srcPhoto, mask;

// UI
let modeRadio, scaleSlider, brushSlider, resetBtn, saveBtn;

// Defaults
let appMode = 'Brush';
let brushSize = 60;
let zoom = 1;

function preload() {
    srcPhoto = loadImage('assets/photo_V.jpg');
}

function setup() {

    pixelDensity(1);
    createCanvas(windowWidth, windowHeight);
    background(200);

    let maxSize = min(windowWidth, windowHeight);
    mask = new Mask(srcPhoto, maxSize);
    createUI();
}

function draw() {
    background(200);
    mask.show();
}

function setBrush() {
    brushSize = brushSlider.value();
}

function setScale() {
    zoom = scaleSlider.value();
    mask.updSize(scaleSlider.value());
}

function resetMask() {
    zoom = 1;
    brushSize = 60;
    scaleSlider.value(zoom);
    brushSlider.value(brushSize);
    mask.reset();
}

function saveMask() {
    mask.save();
}

function mouseDragged() {
    if (appMode == 'Scale') {
        mask.updSize(zoom);
    }
    mask.pressed();
}

function mouseReleased() {
    mask.released();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
