var Research = function (name, isPurchased, cost, requirements) {
    this.name = name;
    this.isPurchased = isPurchased;
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
        if (this.cost[i] > Resource.objects[i].quantity) {
            return false;
        }
    }
    return true;
}});

Research.prototype.purchase = function () {
    var i;
    if (this.isAffordable) {
        for (i = 0; i < this.cost.length; i++) {
            Resource.objects[i].quantity -= this.cost[i];
        }
        this.isPurchased = true;
    }
};

Research.prototype.update = function (position) {
    if (buttons[0] && !lastButtons[0] && mousePos.x >= 320 && mousePos.x < 620 && mousePos.y >= 10 + 75 * position && mousePos.y < 75 + 75 * position) {
        this.purchase();
    }
};

Research.prototype.draw = function (position) {
    var count,
        j;
    if (mousePos.x >= 320 && mousePos.x < 620 && mousePos.y >= 10 + 75 * position && mousePos.y < 75 + 75 * position && this.isAffordable) {
        context.fillStyle = '#333333';
    } else {
        context.fillStyle = '#000000';
    }
    context.fillRect(320, 10 + 75 * position, 300, 65);
    context.fillStyle = this.isAffordable ? '#FFFFFF' : '#FF0000';
    context.textBaseline = 'top';
    context.textAlign = 'left';
    context.font = '15px Arial';
    context.fillText(this.name, 330, 14 + 75 * position);
    for (count = 0, j = 0; j < this.cost.length; j++) {
        if (this.cost[j]) {
            context.fillText(Resource.objects[j].name + ': ' + this.cost[j], 330 + 100 * count, 34 + 75 * position);
            count++;
        }
    }
};

Research.update = function () {
    var position,
        i;
    for (position = 0, i = 0; i < this.objects.length; i++) {
        if (!this.objects[i].isPurchased) {
            this.objects[i].update(position);
            position++;
        }
    }
};

Research.draw = function () {
    var position,
        i;
    for (position = 0, i = 0; i < this.objects.length; i++) {
        if (!this.objects[i].isPurchased) {
            this.objects[i].draw(position);
            position++;
        }
    }
};

Research.objects = [
    new Research('Wooden Tools', false, [100, 0, 0], []),
    new Research('Stone Tools', false, [0, 100, 0], [0]),
    new Research('Copper Tools', false, [0, 0, 100], [1])
];
