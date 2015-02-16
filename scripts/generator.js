var Generator = function (options) {
    ResearchableMixin.call(this, options);
    PurchasableMixin.call(this, options);
    ButtonMixin.call(this, options);
    options = options || {};
    this.name = options.name;
    this.outputs = options.outputs || [];
    this.size = options.size || {x: 500, y: 65};
};

Object.defineProperties(Generator.prototype, ResearchableMixin.prototype);
Object.defineProperties(Generator.prototype, PurchasableMixin.prototype);
Object.defineProperties(Generator.prototype, ButtonMixin.prototype);

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

Object.defineProperty(Generator.prototype, 'isVisible', { get: function () {
    return this.isUnlocked;
}});

Generator.prototype.update = function () {
    var i;
    for (i = 0; i < this.outputs.length; i++) {
        this.resources[i].quantity += this.quantity * this.outputs[i] / 100;
    }
    if (this.isClicked) {
        this.purchase();
    }
};

Generator.prototype.draw = function () {
    var count,
        i;
    context.fillStyle = this.isFocused && this.isAffordable ? '#333333' : '#000000';
    context.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    context.fillStyle = this.isAffordable ? '#FFFFFF' : '#FF0000';
    context.textBaseline = 'top';
    context.textAlign = 'left';
    context.font = '15px Arial';
    context.fillText(this.quantity + 'x ' + this.name, this.pos.x + 10, this.pos.y + 4);
    for (count = 0, i = 0; i < this.costs.length; i++) {
        if (this.costs[i]) {
            context.fillText(this.resources[i].name + ': ' + this.costs[i], this.pos.x + 10 + 100 * count, this.pos.y + 24);
            count++;
        }
    }
    for (count = 0, i = 0; i < this.outputs.length; i++) {
        if (this.outputs[i]) {
            context.fillText(this.resources[i].name + '/s: ' + this.outputs[i], this.pos.x + 10 + 100 * count, this.pos.y + 44);
            count++;
        }
    }
};

Generator.update = function () {
    var position,
        i;
    for (position = 0, i = 0; i < this.objects.length; i++) {
        if (Menu.objects[0].isActive && this.objects[i].isUnlocked) {
            this.objects[i].pos = {x: 10, y: 45 + 75 * position};
            position++;
        } else {
            this.objects[i].pos = {};
        }
        this.objects[i].update();
    }
};

Generator.draw = function () {
    var position,
        i;
    for (position = 0, i = 0; i < this.objects.length; i++) {
        if (Menu.objects[0].isActive && this.objects[i].isUnlocked) {
            this.objects[i].pos = {x: 10, y: 45 + 75 * position};
            position++;
        } else {
            this.objects[i].pos = {};
        }
        this.objects[i].draw();
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
