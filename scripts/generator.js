var Generator = function (name, quantity, resources, costs, outputs, requirements) {
    this.name = name;
    this.quantity = quantity;
    this.resources = resources;
    this.initialCost = costs;
    this.outputs = outputs;
    this.requirements = requirements;
};

Object.defineProperty(Generator.prototype, 'isUnlocked', { get: function () {
    var i;
    for (i = 0; i < this.requirements.length; i++) {
        if (!this.requirements[i].isPurchased) {
            return false;
        }
    }
    return true;
}});

Object.defineProperty(Generator.prototype, 'costs', { get: function () {
    var costs = [],
        i;
    for (i = 0; i < this.initialCost.length; i++) {
        costs[i] = Math.floor(Math.pow(1.1, this.quantity) * this.initialCost[i]);
    }
    return costs;
}});

Object.defineProperty(Generator.prototype, 'isAffordable', { get: function () {
    var i;
    for (i = 0; i < this.costs.length; i++) {
        if (this.costs[i] > this.resources[i].quantity) {
            return false;
        }
    }
    return true;
}});

Generator.prototype.purchase = function () {
    var i;
    if (this.isAffordable) {
        for (i = 0; i < this.costs.length; i++) {
            this.resources[i].quantity -= this.costs[i];
        }
        this.quantity++;
    }
};

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
    new Generator('Wooden Axe', 1, [Resource.objects[0]], [150], [5], [Research.objects[0]]),
    new Generator('Wooden Pickaxe', 0, [Resource.objects[0], Resource.objects[1]], [250, 0], [0, 2], [Research.objects[0]]),
    new Generator('Stone Axe', 0, [Resource.objects[0], Resource.objects[1]], [50, 100], [10, 0], [Research.objects[1]]),
    new Generator('Stone Pickaxe', 0, [Resource.objects[0], Resource.objects[1], Resource.objects[2]], [50, 200, 0], [0, 4, 1], [Research.objects[1]]),
    new Generator('Copper Axe', 0, [Resource.objects[0], Resource.objects[2]], [50, 100], [25, 0], [Research.objects[2]]),
    new Generator('Copper Pickaxe', 0, [Resource.objects[0], Resource.objects[1], Resource.objects[2]], [50, 0, 200], [0, 10, 3], [Research.objects[2]])
];
