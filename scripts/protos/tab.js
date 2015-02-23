var Tab = function (options) {
    ClickableMixin.call(this, options);
    options = options || {};
    this.name = options.name;
    this.buttons = options.buttons || [];
    this.isActive = options.isActive || false;
    this.size = options.size || {x: 100, y: 25};
};

Object.defineProperties(Tab.prototype, ClickableMixin.prototype);

Tab.prototype.update = function () {
    if (this.isClicked) {
        this.isActive = true;
    }
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
};
