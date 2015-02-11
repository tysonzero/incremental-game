var PurchasableMixin = function (options) {
    options = options || {};
    this.quantity = options.quantity || 0;
    this.resources = options.resources || [];
    this.costs = options.costs || [];
};

PurchasableMixin.prototype.isAffordable = { get: function () {
    var i;
    for (i = 0; i < this.costs.length; i++) {
        if (this.costs[i] > this.resources[i].quantity) {
            return false;
        }
    }
    return true;
}};

PurchasableMixin.prototype.purchase = { value: function () {
    var i;
    if (this.isAffordable) {
        for (i = 0; i < this.costs.length; i++) {
            this.resources[i].quantity -= this.costs[i];
        }
        this.quantity++;
    }
}};
