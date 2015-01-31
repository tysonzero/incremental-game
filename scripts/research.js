var Research = function (name, isPurchased, cost, unlocks) {
    this.name = name;
    this.isPurchased = isPurchased;
    this.cost = cost;
    this.unlocks = unlocks;
};

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

Research.prototype.update = function (i) {
    if (buttons[0] && !lastButtons[0] && mousePos.x >= 320 && mousePos.x < 620 && mousePos.y >= 10 + 75 * i && mousePos.y < 75 + 75 * i) {
        this.purchase();
    }
};

Research.prototype.draw = function (i) {
    var count,
        j;
    if (mousePos.x >= 320 && mousePos.x < 620 && mousePos.y >= 10 + 75 * i && mousePos.y < 75 + 75 * i && this.isAffordable) {
        context.fillStyle = '#333333';
    } else {
        context.fillStyle = '#000000';
    }
    context.fillRect(320, 10 + 75 * i, 300, 65);
    context.fillStyle = this.isAffordable ? '#FFFFFF' : '#FF0000';
    context.textBaseline = 'top';
    context.textAlign = 'left';
    context.font = '15px Arial';
    context.fillText(this.name, 330, 14 + 75 * i);
    for (count = 0, j = 0; j < this.cost.length; j++) {
        if (this.cost[j]) {
            context.fillText(Resource.objects[j].name + ': ' + this.cost[j], 330 + 100 * count, 34 + 75 * i);
            count++;
        }
    }
};

Research.update = function () {
    var i;
    for (i = 0; i < this.objects.length; i++) {
        if (!this.objects[i].isPurchased) {
            this.objects[i].update(i);
        }
    }
};

Research.draw = function () {
    var i;
    for (i = 0; i < this.objects.length; i++) {
        if (!this.objects[i].isPurchased) {
            this.objects[i].draw(i);
        }
    }
};

Research.objects = [
    new Research('Wooden Tools', false, [100, 0], [0, 1]),
    new Research('Stone Tools', false, [0, 100], [2, 3])
];
