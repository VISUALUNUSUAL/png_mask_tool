let photo;
let maskBuffer;
let tempBuffer;

// buffer dimensions
let buffer_W, buffer_H;

// buffer coordionates
let buffer_X, buffer_Y;

// UI elements
let brushSlider, scaleSlider, resetBtn, saveBtn, modeRadio;

// defaults
let appMode = 'Brush';
let brushSize = 60;
let scaleSize = 1;

let dragObj;

function preload() {
    // Load source image 
    // (TODO: proportionaly resize image on load to fit in fixed size square area (640 x 640 px) )
    photo = loadImage('assets/moonwalk.jpg');
}

function setup() {

    // Create App canvas with window dimensions (fullscreen)
    createCanvas(windowWidth, windowHeight);

    // Get size of original photo 
    // (TODO: normalisze dimensions if photo is bigger than 640px)
    buffer_W = photo.width;
    buffer_H = photo.height;

    buffer_X = (width - buffer_W) / 2;
    buffer_Y = (height - buffer_H) / 2;

    // Create Mask buffer with image dimensions
    maskBuffer = createGraphics(buffer_W, buffer_H);
    tempBuffer = createGraphics(buffer_W, buffer_H);

    // create UI elements and assign functions on it
    createUI();

    // Setup buffers
    modeSelect();

    dragObj = new Draggable(buffer_X, buffer_Y, buffer_W, buffer_H);
}

function draw() {

    // App canvas background
    background(200);

    scaleSize = scaleSlider.value();
    brushSize = brushSlider.value();

    //  Display original photo with updated dimensions
    image(photo, (width - buffer_W) / 2, (height - buffer_H) / 2, buffer_W, buffer_H);

    // SCALE MODE
    // Set new dimensions (width and height) for the main buffer 
    if (appMode == 'Scale') {

        // Calculate new main buffer dimensions with scale value from scale slider
        buffer_W = photo.width * scaleSize;
        buffer_H = photo.height * scaleSize;

        // Resize temp buffer with new width and height
        tempBuffer.resizeCanvas(buffer_W, buffer_H);

        // Save current graphics to the temp buffer width same size as source
        tempBuffer.copy(maskBuffer, 0, 0, maskBuffer.width, maskBuffer.height, 0, 0, buffer_W, buffer_H);

        // Display temp buffer on screen to show scale changes
        image(tempBuffer, (width - buffer_W) / 2, (height - buffer_H) / 2);
        
        dragObj.w = buffer_W;   
        dragObj.h = buffer_H;
        
        dragObj.over();
        dragObj.update();
        dragObj.show();


    }

    // Brush drawing mode. 
    if (appMode == 'Brush') {
        if (mouseIsPressed) {
            maskBuffer.noStroke();
            maskBuffer.fill(255);
            maskBuffer.ellipse(mouseX - (width - buffer_W) / 2, mouseY - (height - buffer_H) / 2, brushSize, brushSize);
        }
        // Display mask buffer on screen
        image(maskBuffer, (width - buffer_W) / 2, (height - buffer_H) / 2);
    }

}

// Runs once when Mode changed
function modeSelect() {

    // get name of the Mode
    appMode = modeRadio.value();

    // Setuo Scale Mode
    if (appMode == 'Scale') {

        brushSlider.hide();
        scaleSlider.show();

        //  create temp buffer with size of current buffer
        tempBuffer = createGraphics(maskBuffer.width, maskBuffer.height);

        // Setup Scale Mode
    }
    if (appMode == 'Brush') {

        brushSlider.show();
        scaleSlider.hide();

        // create new main buffer with  size of temp buffer
        maskBuffer = createGraphics(buffer_W, buffer_H);

        // Copy temp buffer into main buffer with new dimensions
        maskBuffer.copy(tempBuffer, 0, 0, buffer_W, buffer_H, 0, 0, buffer_W, buffer_H);
    }
}

function resetMask() {
    // Clear main buffer
    maskBuffer.clear();

    //  restore default values for brush and scale
    brushSize = 60;
    scaleSize = 1;

    // set default slaiders vallues
    scaleSlider.value(scaleSize);
    brushSlider.value(brushSize);

    // resize to original size
    modeSelect();
}

function windowResized() {
    // Resize App canvas if window resize event occurs
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
    dragObj.pressed();
}

function mouseReleased() {
    dragObj.released();
}
