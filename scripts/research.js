var Research = function (options) {
    options = options || {};
    this.name = options.name;
    this.quantity = options.quantity || 0;
    this.resources = options.resources || [];
    this.costs = options.costs || [];
    this.requirements = options.requirements || [];
};

Object.defineProperties(Research.prototype, PurchasableMixin.prototype);

Object.defineProperty(Research.prototype, 'isUnlocked', { get: function () {
    var i;
    for (i = 0; i < this.requirements.length; i++) {
        if (!this.requirements[i].quantity) {
            return false;
        }
    }
    return true;
}});

Research.prototype.update = function (position) {
    if (buttons[0] && !lastButtons[0] && mousePos.x >= 10 && mousePos.x < 510 && mousePos.y >= 45 + 55 * position && mousePos.y < 90 + 55 * position) {
        this.purchase();
    }
};

Research.prototype.draw = function (position) {
    var count,
        i;
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
    for (count = 0, i = 0; i < this.costs.length; i++) {
        if (this.costs[i]) {
            context.fillText(this.resources[i].name + ': ' + this.costs[i], 20 + 100 * count, 69 + 55 * position);
            count++;
        }
    }
};

Research.update = function () {
    var position,
        i;
    if (Menu.objects[1].isActive) {
        for (position = 0, i = 0; i < this.objects.length; i++) {
            if (this.objects[i].isUnlocked && !this.objects[i].quantity) {
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
            if (this.objects[i].isUnlocked && !this.objects[i].quantity) {
                this.objects[i].draw(position);
                position++;
            }
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
