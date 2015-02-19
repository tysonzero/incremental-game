var Resource = function (options) {
    options = options || {};
    this.name = options.name;
    this.lastQuantity = this.quantity = options.quantity || 0;
    this.rate = 0;
};

Object.defineProperty(Resource.prototype, 'isVisible', { get: function () {
    return this.quantity || this.rate;
}});

Resource.prototype.update = function () {
    this.rate = (this.quantity - this.lastQuantity) * 100;
    this.lastQuantity = this.quantity;
};

Resource.prototype.draw = function (position) {
    context.font = '30px Arial';
    context.fillStyle = '#000000';
    context.textBaseline = 'top';
    context.textAlign = 'right';
    context.fillText(this.name + ': ' + Math.floor(this.quantity), 790, 9 + 75 * position);
    context.fillText(this.name + '/s: ' + Math.round(this.rate), 790, 44 + 75 * position);
};

Resource.update = function () {
    var i;
    for (i = 0; i < this.objects.length; i++) {
        if (this.objects[i].isVisible) {
            this.objects[i].update();
        }
    }
};

Resource.draw = function () {
    var position,
        i;
    for (position = 0, i = 0; i < this.objects.length; i++) {
        if (this.objects[i].isVisible) {
            this.objects[i].draw(position);
            position++;
        }
    }
};
