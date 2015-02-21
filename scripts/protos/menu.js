var Menu = function (options) {
    options = options || {};
    this.tabs = options.tabs;
};

Menu.prototype.updateTabs = function () {
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

Menu.prototype.drawTabs = function () {
    var i;
    for (i = 0; i < this.tabs.length; i++) {
        this.tabs[i].pos = {x: 10 + 110 * i, y: 10};
        this.tabs[i].draw();
    }
};

Menu.prototype.updateButtons = function () {
    var offset,
        i,
        j;
    for (i = 0; i < this.tabs.length; i++) {
        for (offset = 0, j = 0; j < this.tabs[i].buttons.length; j++) {
            if (this.tabs[i].isActive && this.tabs[i].buttons[j].isVisible) {
                this.tabs[i].buttons[j].pos = {x: 10, y: 45 + offset};
                offset += this.tabs[i].buttons[j].size.y + 10;
            } else {
                this.tabs[i].buttons[j].pos = {};
            }
            this.tabs[i].buttons[j].update();
        }
    }
};

Menu.prototype.drawButtons = function () {
    var offset,
        i,
        j;
    for (i = 0; i < this.tabs.length; i++) {
        for (offset = 0, j = 0; j < this.tabs[i].buttons.length; j++) {
            if (this.tabs[i].isActive && this.tabs[i].buttons[j].isVisible) {
                this.tabs[i].buttons[j].pos = {x: 10, y: 45 + offset};
                offset += this.tabs[i].buttons[j].size.y + 10;
            } else {
                this.tabs[i].buttons[j].pos = {};
            }
            this.tabs[i].buttons[j].draw();
        }
    }
};

Menu.prototype.update = function () {
    this.updateTabs();
    this.updateButtons();
};

Menu.prototype.draw = function () {
    this.drawTabs();
    this.drawButtons();
};
