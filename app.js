let img, mask, brush, maskedImage;

let brushSize = 60;
let canvasScale = 100;

let brushSlider;
let scaleSlider;
let resetButton;
let saveButton;


function preload() {
    img = loadImage('assets/moonwalk.jpg');
}

function setup() {
    var canvas = createCanvas(720, 406);
    canvas.parent('app');

    brushSlider = createSlider(0, 255, 100);
    brushSlider.parent('brushSlider');

    scaleSlider = createSlider(100, 400, 1);
    scaleSlider.parent('scaleSlider');

    resetButton = createButton('reset');
    resetButton.parent('resetButton');
    resetButton.mousePressed(resetMask);

    saveButton = createButton('save');
    saveButton.parent('saveButton');
    saveButton.mousePressed(saveResult);

    brush = createGraphics(width, height);
    mask = createGraphics(width, height);

    mask.noStroke();
    mask.fill(255);
    mask.rect(0, 0, width, height);

}

function draw() {

    brushSize = brushSlider.value();
    canvasScale = scaleSlider.value();

    if (mouseIsPressed) {
        if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
            drawMask();
        }
    }

    image(img, 0, 0);
    push();
    tint(255, 0, 0, 127);
    image(brush, 0, 0);
    pop();
}

function pgMask(_content, _mask) {
    //Create the mask as image
    var img = createImage(_mask.width, _mask.height);
    img.copy(_mask, 0, 0, _mask.width, _mask.height, 0, 0, _mask.width, _mask.height);
    img.loadPixels();
    for (var i = 0; i < img.pixels.length; i += 4) {
        var v = img.pixels[i];
        img.pixels[i] = 0;
        img.pixels[i + 1] = 0;
        img.pixels[i + 2] = 0;
        img.pixels[i + 3] = v;
    }
    img.updatePixels();

    //convert _content from pg to image
    var contentImg = createImage(_content.width, _content.height);
    contentImg.copy(_content, 0, 0, _content.width, _content.height, 0, 0, _content.width, _content.height);
    contentImg.mask(img)
    return contentImg;
}

function drawMask() {
    mask.fill(0);
    mask.noStroke();
    mask.ellipse(mouseX, mouseY, brushSize, brushSize);

    brush.fill(255);
    brush.noStroke();
    brush.ellipse(mouseX, mouseY, brushSize, brushSize);
}

function resetMask() {
    mask.clear();
    brush.clear();

    mask.noStroke();
    mask.fill(255);
    mask.rect(0, 0, width, height);

}

function mouseReleased() {
    maskedImage = pgMask(img, mask);
}

function saveResult() {
    maskedImage.save('OutputImage', 'png');
}