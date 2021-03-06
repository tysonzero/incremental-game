var canvas = document.getElementById('game-canvas');
var context = canvas.getContext('2d');
var keys = [];
var lastKeys = [];
var buttons = [];
var lastButtons = [];
var mousePos = {};
var update = function () {};
var draw = function () {};

canvas.width = 800;
canvas.height = 600;

window.addEventListener('keydown', function (event) {
    keys[event.keyCode] = true;
});

window.addEventListener('keyup', function (event) {
    delete keys[event.keyCode];
});

canvas.addEventListener('mousedown', function (event) {
    buttons[event.button] = true;
});

canvas.addEventListener('mouseup', function (event) {
    delete buttons[event.button];
});

canvas.addEventListener('mousemove', function (event) {
    mousePos.x = event.offsetX;
    mousePos.y = event.offsetY;
});

setInterval(
    function () {
        update();
        context.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        lastKeys = keys.slice();
        lastButtons = buttons.slice();
    },
    10
);
