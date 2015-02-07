var Menu = function (name, isActive) {
    this.name = name;
    this.isActive = isActive;
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

Menu.objects = [
    new Menu('Generators', true),
    new Menu('Research', false)
];
