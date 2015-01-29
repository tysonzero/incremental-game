var canvas = document.getElementById('game-canvas');
var context = canvas.getContext('2d');
var keys = [];
var lastKeys = [];
var buttons = [];
var lastButtons = [];
var mousePos = {};

canvas.width = 800;
canvas.height = 600;

window.addEventListener('keydown', function (event) {
    keys[event.keyCode] = true;
});

window.addEventListener('keyup', function (event) {
    keys[event.keyCode] = undefined;
});

canvas.addEventListener('mousedown', function (event) {
    buttons[event.button] = true;
});

canvas.addEventListener('mouseup', function (event) {
    buttons[event.button] = undefined;
});

canvas.addEventListener('mousemove', function (event) {
    mousePos.x = event.offsetX;
    mousePos.y = event.offsetY;
});

setInterval(
    function () {
        Research.update();
        Generator.update();
        Resource.update();

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, canvas.width, canvas.height);

        Research.draw();
        Generator.draw();
        Resource.draw();

        lastKeys = keys.slice();
        lastButtons = buttons.slice();
    },
    10
);
