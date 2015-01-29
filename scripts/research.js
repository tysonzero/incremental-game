var Research = function (name, isPurchased, cost, unlocks) {
    this.name = name;
    this.isPurchased = isPurchased;
    this.cost = cost;
    this.unlocks = unlocks;
};

Research.objects = [
    new Research('Wooden Tools', false, [100, 0], [0, 1]),
    new Research('Stone Tools', false, [0, 100], [2, 3])
];
