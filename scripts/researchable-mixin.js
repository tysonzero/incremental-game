var ResearchableMixin = function (options) {
    options = options || {};
    this.requirements = options.requirements || [];
};

ResearchableMixin.prototype.isUnlocked = { get: function () {
    var i;
    for (i = 0; i < this.requirements.length; i++) {
        if (!this.requirements[i].quantity) {
            return false;
        }
    }
    return true;
}};
