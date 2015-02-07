var Menu = function (name, isActive) {
    this.name = name;
    this.isActive = isActive;
};

Menu.prototype.update = function (position) {
    var i;
    if (buttons[0] && !lastButtons[0] && mousePos.x >= 10 + 110 * position && mousePos.x < 110 + 110 * position && mousePos.y >= 10 && mousePos.y < 35) {
        for (i = 0; i < Menu.objects.length; i++) {
            Menu.objects[i].isActive = false;
        }
        this.isActive = true;
    }
};

Menu.prototype.draw = function (position) {
    if (this.isActive) {
        context.fillStyle = '#666666';
    } else if (mousePos.x >= 10 + 110 * position && mousePos.x < 110 + 110 * position && mousePos.y >= 10 && mousePos.y < 35) {
        context.fillStyle = '#333333';
    } else {
        context.fillStyle = '#000000';
    }
    context.fillRect(10 + 110 * position, 10, 100, 25);
    context.fillStyle = '#FFFFFF';
    context.textBaseline = 'top';
    context.textAlign = 'left';
    context.font = '15px Arial';
    context.fillText(this.name, 20 + 110 * position, 14);
};

Menu.update = function () {
    var i;
    for (i = 0; i < this.objects.length; i++) {
        this.objects[i].update(i);
    }
};

Menu.draw = function () {
    var i;
    for (i = 0; i < this.objects.length; i++) {
        this.objects[i].draw(i);
    }
};

Menu.objects = [
    new Menu('Generators', false),
    new Menu('Research', true)
];
