var PurchasableMixin = function () {};

PurchasableMixin.prototype.isAffordable = { get: function () {
    var i;
    for (i = 0; i < this.costs.length; i++) {
        if (this.costs[i] > this.resources[i].quantity) {
            return false;
        }
    }
    return true;
}};

