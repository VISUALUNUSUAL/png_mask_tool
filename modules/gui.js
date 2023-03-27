_('brush').checked = true;
_('zoom').checked = false;

_('sizeRange').onchange = function () {
    var size = map(_('sizeRange').value, 2, 20, 4, 20);
    drawSize = size;
}

_('zoomRange').onchange = function () {
    var zooM = map(_('sizeRange').value, 2, 20, 4, 20);
    zoom = zooM;
}

_('zoom').onchange = function () {
    penStyle = 'zoom';
    _('brush').checked = false;
}

_('brush').onchange = function () {
    penStyle = 'brush';
    _('zoom').checked = false;
}

_('clearCanvas').onclick = function (ev) {
    ev.preventDefault();
    if (confirm("Do you want to clear paint")) {
        setup();
        document.body.style.background = '#c8c8c8';
    } else {
        return;
    }
}

_('saveCanvas').onclick = function (ev) {
    ev.preventDefault();
    saveCanvas(paint, 'sketch', 'png');
    setup();
    document.body.style.background = '#c8c8c8';
}
