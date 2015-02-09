var Research = function (name, isPurchased, resources, cost, requirements) {
    this.name = name;
    this.isPurchased = isPurchased;
    this.resources = resources;
    this.cost = cost;
    this.requirements = requirements;
};

Object.defineProperty(Research.prototype, 'isUnlocked', { get: function () {
    var i;
    for (i = 0; i < this.requirements.length; i++) {
        if (!Research.objects[this.requirements[i]].isPurchased) {
            return false;
        }
    }
    return true;
}});

Object.defineProperty(Research.prototype, 'isAffordable', { get: function () {
    var i;
    for (i = 0; i < this.cost.length; i++) {
        if (this.cost[i] > this.resources[i].quantity) {
            return false;
        }
    }
    return true;
}});

Research.prototype.purchase = function () {
    var i;
    if (this.isAffordable) {
        for (i = 0; i < this.cost.length; i++) {
            this.resources[i].quantity -= this.cost[i];
        }
        this.isPurchased = true;
    }
};

Research.prototype.update = function (position) {
    if (buttons[0] && !lastButtons[0] && mousePos.x >= 10 && mousePos.x < 510 && mousePos.y >= 45 + 55 * position && mousePos.y < 90 + 55 * position) {
        this.purchase();
    }
};

Research.prototype.draw = function (position) {
    var count,
        j;
    if (mousePos.x >= 10 && mousePos.x < 510 && mousePos.y >= 45 + 55 * position && mousePos.y < 90 + 55 * position && this.isAffordable) {
        context.fillStyle = '#333333';
    } else {
        context.fillStyle = '#000000';
    }
    context.fillRect(10, 45 + 55 * position, 500, 45);
    context.fillStyle = this.isAffordable ? '#FFFFFF' : '#FF0000';
    context.textBaseline = 'top';
    context.textAlign = 'left';
    context.font = '15px Arial';
    context.fillText(this.name, 20, 49 + 55 * position);
    for (count = 0, j = 0; j < this.cost.length; j++) {
        if (this.cost[j]) {
            context.fillText(this.resources[j].name + ': ' + this.cost[j], 20 + 100 * count, 69 + 55 * position);
            count++;
        }
    }
};

Research.update = function () {
    var position,
        i;
    if (Menu.objects[1].isActive) {
        for (position = 0, i = 0; i < this.objects.length; i++) {
            if (this.objects[i].isUnlocked && !this.objects[i].isPurchased) {
                this.objects[i].update(position);
                position++;
            }
        }
    }
};

Research.draw = function () {
    var position,
        i;
    if (Menu.objects[1].isActive) {
        for (position = 0, i = 0; i < this.objects.length; i++) {
            if (this.objects[i].isUnlocked && !this.objects[i].isPurchased) {
                this.objects[i].draw(position);
                position++;
            }
        }
    }
};

Research.objects = [
    new Research('Wooden Tools', false, [Resource.objects[0]], [100], []),
    new Research('Stone Tools', false, [Resource.objects[1]], [100], [0]),
    new Research('Copper Tools', false, [Resource.objects[2]], [100], [1])
];
