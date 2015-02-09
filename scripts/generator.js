var Generator = function (name, quantity, resources, cost, output, requirements) {
    this.name = name;
    this.quantity = quantity;
    this.resources = resources;
    this.initialCost = cost;
    this.output = output;
    this.requirements = requirements;
};

Object.defineProperty(Generator.prototype, 'isUnlocked', { get: function () {
    var i;
    for (i = 0; i < this.requirements.length; i++) {
        if (!Research.objects[this.requirements[i]].isPurchased) {
            return false;
        }
    }
    return true;
}});

Object.defineProperty(Generator.prototype, 'cost', { get: function () {
    var cost = [],
        i;
    for (i = 0; i < this.initialCost.length; i++) {
        cost[i] = Math.floor(Math.pow(1.1, this.quantity) * this.initialCost[i]);
    }
    return cost;
}});

Object.defineProperty(Generator.prototype, 'isAffordable', { get: function () {
    var i;
    for (i = 0; i < this.cost.length; i++) {
        if (this.cost[i] > this.resources[i].quantity) {
            return false;
        }
    }
    return true;
}});

Generator.prototype.purchase = function () {
    var i;
    if (this.isAffordable) {
        for (i = 0; i < this.cost.length; i++) {
            this.resources[i].quantity -= this.cost[i];
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
        j;
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
    for (j = 0, count = 0; j < this.cost.length; j++) {
        if (this.cost[j]) {
            context.fillText(this.resources[j].name + ': ' + this.cost[j], 20 + 100 * count, 69 + 75 * position);
            count++;
        }
    }
    for (j = 0, count = 0; j < this.output.length; j++) {
        if (this.output[j]) {
            context.fillText(Resource.objects[j].name + '/s: ' + this.output[j], 20 + 100 * count, 89 + 75 * position);
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
    new Generator('Wooden Axe', 1, [Resource.objects[0]], [150], [5, 0, 0], [0]),
    new Generator('Wooden Pickaxe', 0, [Resource.objects[0]], [250], [0, 2, 0], [0]),
    new Generator('Stone Axe', 0, [Resource.objects[0], Resource.objects[1]], [50, 100], [10, 0, 0], [1]),
    new Generator('Stone Pickaxe', 0, [Resource.objects[0], Resource.objects[1]], [50, 200], [0, 4, 1], [1]),
    new Generator('Copper Axe', 0, [Resource.objects[0], Resource.objects[2]], [50, 100], [25, 0, 0], [2]),
    new Generator('Copper Pickaxe', 0, [Resource.objects[0], Resource.objects[2]], [50, 200], [0, 10, 3], [2])
];
