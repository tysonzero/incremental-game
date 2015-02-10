var Generator = function (options) {
    PurchasableMixin.call(this, options);
    options = options || {};
    this.name = options.name;
    this.outputs = options.outputs || [];
    this.requirements = options.requirements || [];
};

Object.defineProperties(Generator.prototype, PurchasableMixin.prototype);

Object.defineProperty(Generator.prototype, 'isUnlocked', { get: function () {
    var i;
    for (i = 0; i < this.requirements.length; i++) {
        if (!this.requirements[i].quantity) {
            return false;
        }
    }
    return true;
}});

Object.defineProperty(Generator.prototype, 'costs', {
    get: function () {
        var costs = [],
            i;
        for (i = 0; i < this._costs.length; i++) {
            costs[i] = Math.floor(Math.pow(1.1, this.quantity) * this._costs[i]);
        }
        return costs;
    },
    set: function (value) {
        this._costs = value;
    }
});

Generator.prototype.update = function (position) {
    if (buttons[0] && !lastButtons[0] && mousePos.x >= 10 && mousePos.x < 510 && mousePos.y >= 45 + 75 * position && mousePos.y < 110 + 75 * position) {
        this.purchase();
    }
};

Generator.prototype.draw = function (position) {
    var count,
        i;
    if (mousePos.x >= 10 && mousePos.x < 510 && mousePos.y >= 45 + 75 * position && mousePos.y < 110 + 75 * position && this.isAffordable) {
        context.fillStyle = '#333333';
    } else {
        context.fillStyle = '#000000';
    }
    context.fillRect(10, 45 + 75 * position, 500, 65);
    context.fillStyle = this.isAffordable ? '#FFFFFF' : '#FF0000';
    context.textBaseline = 'top';
    context.textAlign = 'left';
    context.font = '15px Arial';
    context.fillText(this.quantity + 'x ' + this.name, 20, 49 + 75 * position);
    for (i = 0, count = 0; i < this.costs.length; i++) {
        if (this.costs[i]) {
            context.fillText(this.resources[i].name + ': ' + this.costs[i], 20 + 100 * count, 69 + 75 * position);
            count++;
        }
    }
    for (i = 0, count = 0; i < this.outputs.length; i++) {
        if (this.outputs[i]) {
            context.fillText(this.resources[i].name + '/s: ' + this.outputs[i], 20 + 100 * count, 89 + 75 * position);
            count++;
        }
    }
};

Generator.update = function () {
    var position,
        i;
    if (Menu.objects[0].isActive) {
        for (position = 0, i = 0; i < this.objects.length; i++) {
            if (this.objects[i].isUnlocked) {
                this.objects[i].update(position);
                position++;
            }
        }
    }
};

Generator.draw = function () {
    var position,
        i;
    if (Menu.objects[0].isActive) {
        for (position = 0, i = 0; i < this.objects.length; i++) {
            if (this.objects[i].isUnlocked) {
                this.objects[i].draw(position);
                position++;
            }
        }
    }
};

Generator.objects = [
    new Generator({name: 'Wooden Axe', quantity: 1, resources: [Resource.objects[0]], costs: [150], outputs: [5], requirements: [Research.objects[0]]}),
    new Generator({name: 'Wooden Pickaxe', resources: [Resource.objects[0], Resource.objects[1]], costs: [250, 0], outputs: [0, 2], requirements: [Research.objects[0]]}),
    new Generator({name: 'Stone Axe', resources: [Resource.objects[0], Resource.objects[1]], costs: [50, 100], outputs: [10, 0], requirements: [Research.objects[1]]}),
    new Generator({name: 'Stone Pickaxe', resources: [Resource.objects[0], Resource.objects[1], Resource.objects[2]], costs: [50, 200, 0], outputs: [0, 4, 1], requirements: [Research.objects[1]]}),
    new Generator({name: 'Copper Axe', resources: [Resource.objects[0], Resource.objects[2]], costs: [50, 100], outputs: [25, 0], requirements: [Research.objects[2]]}),
    new Generator({name: 'Copper Pickaxe', resources: [Resource.objects[0], Resource.objects[1], Resource.objects[2]], costs: [50, 0, 200], outputs: [0, 10, 3], requirements: [Research.objects[2]]})
];
