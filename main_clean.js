const X, Y, W, H;

const canvasSize = 640;
const brushSize = 60;
const zoom = 1;

function preload() {
    photo = loadImage('assets/car_H.jpg');
}

function setup() {

    // Create App canvas with window dimensions (fullscreen)

    // resize photo proportionally to fit in canvasSize

    // set dimensions (W,H) based on resized photo that we will use for mask and image

    // set coordinates (X,Y) for top-left corner based on resized photo to position in the center of screen

    // create background photo object 
    
    // create p5 graphics mask buffer with dimensions (W,H) and coordinates (X,Y)
    // (TODO: make class: mask new Mask(X,Y,W,H))

    // create UI to control brush size, image scale, reset button and save button

}

function draw() {

    // App canvas background

    // MODE: BRUSH
    // Update mask buffer graphics with ellipse, mouse coordinates and brush size


    // MODE: SCALE
    // Enable dragging for better position on scale 
    // Update dimensions (W,H) and coordinates (X,Y)


    // Display original photo with normalised dimensions (W,H) and coordinates (X,Y)
    // Display mask buffer with normilised dimensions (W,H) and coordinates (X,Y)

    // Update slider values and UI 

}


// Clear mask buffer and reset dimensions and position
function resetMask() {}


// Convert p5 Graphics mask buffer into an image
// Apply mask image on the original photo with original dimensions
// Save result as png file
function saveMask() {}
