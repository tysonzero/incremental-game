var ButtonMixin = function (options) {
    options = options || {};
    this.pos = options.pos || {};
    this.size = options.size || {};
};

ButtonMixin.prototype.isFocused = { get: function () {
    return mousePos.x >= this.pos.x && mousePos.x < this.pos.x + this.size.x && mousePos.y >= this.pos.y && mousePos.y < this.pos.y + this.size.y;
}};

ButtonMixin.prototype.isClicked = { get: function () {
    return this.isFocused && buttons[0] && !lastButtons[0];
}};
