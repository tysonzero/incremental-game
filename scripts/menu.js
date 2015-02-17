var Menu = function (options) {
    options = options || {};
    this.tabs = options.tabs;
};

Menu.prototype.update = function () {
    var i,
        j;
    for (i = 0; i < this.tabs.length; i++) {
        this.tabs[i].pos = {x: 10 + 110 * i, y: 10};
        this.tabs[i].update();
        if (this.tabs[i].isClicked) {
            for (j = 0; j < this.tabs.length; j++) {
                this.tabs[j].isActive = false;
            }
            this.tabs[i].isActive = true;
        }
    }
};

Menu.prototype.draw = function () {
    var i;
    for (i = 0; i < this.tabs.length; i++) {
        this.tabs[i].pos = {x: 10 + 110 * i, y: 10};
        this.tabs[i].draw();
    }
};

menu = new Menu({tabs: Tab.objects});
