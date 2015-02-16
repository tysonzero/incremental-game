var Research = function (options) {
    ResearchableMixin.call(this, options);
    PurchasableMixin.call(this, options);
    ButtonMixin.call(this, options);
    options = options || {};
    this.name = options.name;
    this.size = options.size || {x: 500, y: 45};
};

Object.defineProperties(Research.prototype, ResearchableMixin.prototype);
Object.defineProperties(Research.prototype, PurchasableMixin.prototype);
Object.defineProperties(Research.prototype, ButtonMixin.prototype);

Object.defineProperty(Research.prototype, 'isVisible', { get: function () {
    return this.isUnlocked && !this.quantity;
}});

Research.prototype.update = function () {
    if (this.isClicked) {
        this.purchase();
    }
};

Research.prototype.draw = function () {
    var count,
        i;
    context.fillStyle = this.isFocused && this.isAffordable ? '#333333' : '#000000';
    context.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    context.fillStyle = this.isAffordable ? '#FFFFFF' : '#FF0000';
    context.textBaseline = 'top';
    context.textAlign = 'left';
    context.font = '15px Arial';
    context.fillText(this.name, this.pos.x + 10, this.pos.y + 4);
    for (count = 0, i = 0; i < this.costs.length; i++) {
        if (this.costs[i]) {
            context.fillText(this.resources[i].name + ': ' + this.costs[i], this.pos.x + 10 + 100 * count, this.pos.y + 24);
            count++;
        }
    }
};

Research.objects = [
    new Research({name: 'Wooden Tools', resources: [Resource.objects[0]], costs: [100]}),
    new Research({name: 'Stone Tools', resources: [Resource.objects[1]], costs: [100]}),
    new Research({name: 'Copper Tools', resources: [Resource.objects[2]], costs: [100]})
];
Research.objects[1].requirements.push(Research.objects[0]);
Research.objects[2].requirements.push(Research.objects[1]);
