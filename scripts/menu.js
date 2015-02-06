var Menu = function (name, isActive) {
    this.name = name;
    this.isActive = isActive;
};

Menu.objects = [
    new Menu('Generators', true),
    new Menu('Research', false)
];
