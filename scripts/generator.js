var Generator = function (name, quantity, cost, output) {
    this.name = name;
    this.quantity = quantity;
    this.cost = cost;
    this.output = output;
};

Object.defineProperty(Generator.prototype, 'isAffordable', { get: function () {
    var i = 0;
    for (i = 0; i < this.cost.length; i++) {
        if (this.cost[i] > Resource.objects[i].quantity) {
            return false;
        }
    }
    return true;
}});

Generator.objects = [
    new Generator('Wooden Axe', 1, [100, 0], [5, 0]),
    new Generator('Wooden Pickaxe', 0, [200, 0], [0, 1]),
    new Generator('Stone Axe', 0, [0, 100], [10, 0]),
    new Generator('Stone Pickaxe', 0, [0, 200], [0, 2])
];
