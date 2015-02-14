var Menu = function (options) {
    ButtonMixin.call(this, options);
    options = options || {};
    this.name = options.name;
    this.isActive = options.isActive || false;
    this.size = options.size || {x: 100, y: 25};
};

Object.defineProperties(Menu.prototype, ButtonMixin.prototype);

Menu.prototype.update = function () {
    var i;
    if (this.isClicked) {
        for (i = 0; i < Menu.objects.length; i++) {
            Menu.objects[i].isActive = false;
        }
        this.isActive = true;
    }
};

Menu.prototype.draw = function () {
    if (this.isActive) {
        context.fillStyle = '#666666';
    } else if (this.isFocused) {
        context.fillStyle = '#333333';
    } else {
        context.fillStyle = '#000000';
    }
    context.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    context.fillStyle = '#FFFFFF';
    context.textBaseline = 'top';
    context.textAlign = 'left';
    context.font = '15px Arial';
    context.fillText(this.name, this.pos.x + 10, this.pos.y + 4);
};

Menu.update = function () {
    var i;
    for (i = 0; i < this.objects.length; i++) {
        this.objects[i].pos = {x: 10 + 110 * i, y: 10};
        this.objects[i].update();
    }
};

Menu.draw = function () {
    var i;
    for (i = 0; i < this.objects.length; i++) {
        this.objects[i].pos = {x: 10 + 110 * i, y: 10};
        this.objects[i].draw();
    }
};

Menu.objects = [
    new Menu({name: 'Generators'}),
    new Menu({name: 'Research', isActive: true})
];
