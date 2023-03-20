// Graphics
let srcPhoto, mask;
let photo;

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

    createCanvas(windowWidth, windowHeight);
    background(200);

    //    let maxSize = 640;
    let maxSize = min(windowWidth, windowHeight);
    mask = new Mask(srcPhoto, maxSize);

    createUI();
}

function draw() {
    background(200);

    brushSize = brushSlider.value();
    appMode = modeRadio.value();
    zoom = scaleSlider.value();

    mask.resize(zoom);
    mask.drawMask(brushSize);
    mask.show();
}

function mousePressed() {
    mask.pressed();
}

function mouseReleased() {
    mask.released();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    
}

function resetMask() {
    // set default sliders vallues
    zoom = 1;
    brushSize = 60;
    scaleSlider.value(zoom);
    brushSlider.value(brushSize);
    mask.reset();
}

function saveMask() {
    mask.save();
}
