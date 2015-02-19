var List = function (options) {
    options = options || {};
    this.items = options.items || [];
};

List.prototype.update = function () {
    var i;
    for (i = 0; i < this.items.length; i++) {
        if (this.items[i].isVisible) {
            this.items[i].update();
        }
    }
};

List.prototype.draw = function () {
    var position,
        i;
    for (position = 0, i = 0; i < this.items.length; i++) {
        if (this.items[i].isVisible) {
            this.items[i].draw(position);
            position++;
        }
    }
};
