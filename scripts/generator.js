var Generator = function (name, quantity, cost, output) {
    this.name = name;
    this.quantity = quantity;
    this.initialCost = cost;
    this.output = output;
};

Object.defineProperty(Generator.prototype, 'isUnlocked', { get: function () {
    var i;
    for (i = 0; i < Research.objects.length; i++) {
        if (Research.objects[i].isPurchased && Research.objects[i].unlocks.indexOf(Generator.objects.indexOf(this)) !== -1) {
            return true;
        }
    }
    return false;
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
        if (this.cost[i] > Resource.objects[i].quantity) {
            return false;
        }
    }
    return true;
}});

Generator.prototype.purchase = function () {
    var i;
    if (this.isAffordable) {
        for (i = 0; i < this.cost.length; i++) {
            Resource.objects[i].quantity -= this.cost[i];
        }
        this.quantity++;
    }
};

Generator.prototype.update = function (i) {
    if (buttons[0] && !lastButtons[0] && mousePos.x >= 10 && mousePos.x < 310 && mousePos.y >= 10 + 75 * i && mousePos.y < 75 + 75 * i) {
        this.purchase();
    }
};

Generator.prototype.draw = function (i) {
    var count,
        j;
    if (mousePos.x >= 10 && mousePos.x < 310 && mousePos.y >= 10 + 75 * i && mousePos.y < 75 + 75 * i && this.isAffordable) {
        context.fillStyle = '#333333';
    } else {
        context.fillStyle = '#000000';
    }
    context.fillRect(10, 10 + 75 * i, 300, 65);
    context.fillStyle = this.isAffordable ? '#FFFFFF' : '#FF0000';
    context.textBaseline = 'top';
    context.textAlign = 'left';
    context.font = '15px Arial';
    context.fillText(this.quantity + 'x ' + this.name, 20, 14 + 75 * i);
    for (j = 0, count = 0; j < this.cost.length; j++) {
        if (this.cost[j]) {
            context.fillText(Resource.objects[j].name + ': ' + this.cost[j], 20 + 100 * count, 34 + 75 * i);
            count++;
        }
    }
    for (j = 0, count = 0; j < this.output.length; j++) {
        if (this.output[j]) {
            context.fillText(Resource.objects[j].name + '/s: ' + this.output[j], 20 + 100 * count, 54 + 75 * i);
            count++;
        }
    }
};

Generator.update = function () {
    var i;
    for (i = 0; i < this.objects.length; i++) {
        this.objects[i].update(i);
    }
};

Generator.draw = function () {
    var i;
    for (i = 0; i < this.objects.length; i++) {
        this.objects[i].draw(i);
    }
};

Generator.objects = [
    new Generator('Wooden Axe', 1, [100, 0], [5, 0]),
    new Generator('Wooden Pickaxe', 0, [200, 0], [0, 1]),
    new Generator('Stone Axe', 0, [0, 100], [10, 0]),
    new Generator('Stone Pickaxe', 0, [0, 200], [0, 2])
];
