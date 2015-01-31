var Resource = function (name, quantity) {
    this.name = name;
    this.quantity = quantity;
};

Object.defineProperty(Resource.prototype, 'rate', { get: function () {
    var rate = 0,
        i;
    for (i = 0; i < Generator.objects.length; i++) {
        rate += Generator.objects[i].quantity * Generator.objects[i].output[Resource.objects.indexOf(this)];
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
        this.objects[i].update();
    }
};

Resource.draw = function () {
    var i;
    for (i = 0; i < this.objects.length; i++) {
        this.objects[i].draw(i);
    }
};

Resource.objects = [
    new Resource('Wood', 100),
    new Resource('Stone', 0),
    new Resource('Copper', 0)
];
