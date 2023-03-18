// Graphics
let srcPhoto, mask;
let photo;

// UI
let modeRadio, scaleSlider, brushSlider, resetBtn, saveBtn;

// Defaults
let appMode = 'Brush';
let maxSize = 640;
let brushSize = 60;
let zoom = 1;

function preload() {
    srcPhoto = loadImage('assets/photo_V.jpg');
}

function setup() {

    // Create App canvas with window dimensions (fullscreen)
    createCanvas(windowWidth, windowHeight);
    background(200);

    // get dimensions (W,H) based on resized photo that we will use for mask and image
    // get coordinates (X,Y) for top-left corner based on resized photo to position in the center of screen
    // create background photo object 
    // resize photo proportionally to fit in canvasSize
    photo = new Resizer(srcPhoto);

    // create p5 graphics mask buffer with dimensions (W,H) and coordinates (X,Y)
    mask = new Mask(photo);

    // create UI to control brush size, image scale, reset button and save button
    createUI();
}

function draw() {
    // App canvas background
    background(200);

    // Update slider values and UI 
    zoom = scaleSlider.value();
    brushSize = brushSlider.value();
    
    // Display original photo with normalised dimensions (W,H) and coordinates (X,Y)
    photo.normalise(zoom);
    photo.updateDrag();
    photo.show();

    // Display mask buffer with normilised dimensions (W,H) and coordinates (X,Y)
    mask.update();
    mask.show();

}

function mousePressed() {
    photo.pressed();
}

function mouseReleased() {
    photo.released();

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    photo.normalise(zoom);
}

// Clear mask buffer and reset dimensions and position
function resetMask() {

    // restore default values for brush and scale
    brushSize = 60;
    zoom = 1;

    // reset to defaults coordinates
    photo.reset();

    // Clear mask buffer
    mask.reset();

    // set default slaiders vallues
    scaleSlider.value(zoom);
    brushSlider.value(brushSize);
}


// Convert p5 Graphics mask buffer into an image
// Apply mask image on the original photo with original dimensions
// Save result as png file
function saveMask() {
    let result = output(srcPhoto, mask.buff);

    result.save('OutputImage', 'png');
    console.log("result saved");
}
