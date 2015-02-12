var Resource = function (options) {
    options = options || {};
    this.name = options.name;
    this.quantity = options.quantity || 0;
};

Object.defineProperty(Resource.prototype, 'rate', { get: function () {
    var rate = 0,
        i;
    for (i = 0; i < Generator.objects.length; i++) {
        rate += Generator.objects[i].quantity * Generator.objects[i].outputs[Generator.objects[i].resources.indexOf(this)] || 0;
    }
    return rate;
}});

Resource.prototype.update = function () {
    this.quantity += this.rate / 100;
};

Resource.prototype.draw = function (position) {
    context.font = '30px Arial';
    context.fillStyle = '#000000';
    context.textBaseline = 'top';
    context.textAlign = 'right';
    context.fillText(this.name + ': ' + Math.floor(this.quantity), 790, 9 + 75 * position);
    context.fillText(this.name + '/s: ' + this.rate, 790, 44 + 75 * position);
};

Resource.update = function () {
    var i;
    for (i = 0; i < this.objects.length; i++) {
        if (this.objects[i].quantity || this.objects[i].rate) {
            this.objects[i].update();
        }
    }
};

Resource.draw = function () {
    var position,
        i;
    for (position = 0, i = 0; i < this.objects.length; i++) {
        if (this.objects[i].quantity || this.objects[i].rate) {
            this.objects[i].draw(position);
            position++;
        }
    }
};

Resource.objects = [
    new Resource({name: 'Wood', quantity: 100}),
    new Resource({name: 'Stone'}),
    new Resource({name: 'Copper'})
];
