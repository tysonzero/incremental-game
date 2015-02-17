var Tab = function (options) {
    ButtonMixin.call(this, options);
    options = options || {};
    this.name = options.name;
    this.buttons = options.buttons;
    this.isActive = options.isActive || false;
    this.size = options.size || {x: 100, y: 25};
};

Object.defineProperties(Tab.prototype, ButtonMixin.prototype);

Tab.prototype.updateButtons = function () {
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

Tab.prototype.drawButtons = function () {
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

Tab.prototype.update = function () {
    var i;
    if (this.isClicked) {
        for (i = 0; i < menu.tabs.length; i++) {
            menu.tabs[i].isActive = false;
        }
        this.isActive = true;
    }
    this.updateButtons();
};

Tab.prototype.draw = function () {
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

Tab.objects = [
    new Tab({name: 'Generators', buttons: Generator.objects}),
    new Tab({name: 'Research', buttons: Research.objects, isActive: true})
];
