var Menu = function (options) {
    ButtonMixin.call(this, options);
    options = options || {};
    this.name = options.name;
    this.buttons = options.buttons;
    this.isActive = options.isActive || false;
    this.size = options.size || {x: 100, y: 25};
};

Object.defineProperties(Menu.prototype, ButtonMixin.prototype);

Menu.prototype.updateButtons = function () {
    var offset,
        i;
    for (offset = 0, i = 0; i < this.buttons.length; i++) {
        if (this.isActive && this.buttons[i].isVisible) {
            this.buttons[i].pos = {x: 10, y: 45 + offset};
            offset += this.buttons[i].size.y + 10;
        } else {
            this.buttons[i].pos = {};
        }
        this.buttons[i].update();
    }
};

Menu.prototype.drawButtons = function () {
    var offset,
        i;
    for (offset = 0, i = 0; i < this.buttons.length; i++) {
        if (this.isActive && this.buttons[i].isVisible) {
            this.buttons[i].pos = {x: 10, y: 45 + offset};
            offset += this.buttons[i].size.y + 10;
        } else {
            this.buttons[i].pos = {};
        }
        this.buttons[i].draw();
    }
};

Menu.prototype.update = function () {
    var i;
    if (this.isClicked) {
        for (i = 0; i < Menu.objects.length; i++) {
            Menu.objects[i].isActive = false;
        }
        this.isActive = true;
    }
    this.updateButtons();
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
    this.drawButtons();
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
    new Menu({name: 'Generators', buttons: Generator.objects}),
    new Menu({name: 'Research', buttons: Research.objects, isActive: true})
];
