function createUI() {

    modeRadio = createRadio();
    modeRadio.position(32, 32);
    modeRadio.option('Brush');
    modeRadio.option('Scale');
    modeRadio.selected('Brush');
    modeRadio.style('width', '160px');
    modeRadio.changed(modeSelect);

    scaleSlider = createSlider(1, 3, 1, .01); // min, max, start
    scaleSlider.position(32, 80); // x and y
    scaleSlider.size(256, 20); // width and height 

    brushSlider = createSlider(4, 200, 60, .01); // min, max, start
    brushSlider.position(32, 80); // x and y
    brushSlider.size(256, 20); // width and height 

    resetBtn = createButton('Reset');
    resetBtn.position(176, 128);
    resetBtn.size(112, 32); // width and height 
    resetBtn.mousePressed(resetMask);

    saveBtn = createButton('Save');
    saveBtn.position(32, 128);
    saveBtn.size(112, 32); // width and height 
    saveBtn.mousePressed(saveMask);

    scaleSlider.hide();
}

// Runs once when Mode changed
function modeSelect() {
    if (appMode == 'Scale') {
        brushSlider.hide();
        scaleSlider.show();
    }
    if (appMode == 'Brush') {
        brushSlider.show();
        scaleSlider.hide();
    }
}

