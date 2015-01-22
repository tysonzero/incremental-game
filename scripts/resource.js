var Resource = function (name, quantity) {
    this.name = name;
    this.quantity = quantity;
};

Resource.prototype.draw = function (i) {
    context.font = '30px Arial';
    context.fillStyle = '#000000';
    context.textBaseline = 'middle';
    context.textAlign = 'right';
    context.fillText(this.name + ': ' + this.quantity, 750, 50 + 50 * i);
};

Resource.draw = function () {
    var i;
    for (i = 0; i < this.objects.length; i++) {
        this.objects[i].draw(i);
    }
};

