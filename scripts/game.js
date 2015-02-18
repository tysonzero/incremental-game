(function () {
    update = function () {
        menu.update();
        Resource.update();
    };

    draw = function () {
        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, canvas.width, canvas.height);

        menu.draw();
        Resource.draw();
    };
})();
