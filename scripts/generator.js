var Generator = function (name, quantity, cost, output) {
    this.name = name;
    this.quantity = quantity;
    this.cost = cost;
    this.output = output;
};

Generator.objects = [
    new Generator('Wooden Axe', 1, [100, 0], [5, 0]),
    new Generator('Wooden Pickaxe', 0, [200, 0], [0, 1]),
    new Generator('Stone Axe', 0, [0, 100], [10, 0]),
    new Generator('Stone Pickaxe', 0, [0, 200], [0, 2])
];
