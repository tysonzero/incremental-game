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

Resource.objects = [
    new Resource('Wood', 100),
    new Resource('Stone', 0)
];
