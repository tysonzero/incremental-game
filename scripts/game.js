(function () {
    var resources = [
        new Resource({name: 'Wood', quantity: 100}),
        new Resource({name: 'Stone'}),
        new Resource({name: 'Copper'})
    ];

    var research = [
        new Research({name: 'Wooden Tools', resources: [resources[0]], costs: [100]}),
        new Research({name: 'Stone Tools', resources: [resources[1]], costs: [100]}),
        new Research({name: 'Copper Tools', resources: [resources[2]], costs: [100]})
    ];
    research[1].requirements.push(research[0]);
    research[2].requirements.push(research[1]);

    var generators = [
        new Generator({name: 'Wooden Axe', quantity: 1, resources: [resources[0]], costs: [150], outputs: [5], requirements: [research[0]]}),
        new Generator({name: 'Wooden Pickaxe', resources: [resources[0], resources[1]], costs: [250, 0], outputs: [0, 2], requirements: [research[0]]}),
        new Generator({name: 'Stone Axe', resources: [resources[0], resources[1]], costs: [50, 100], outputs: [10, 0], requirements: [research[1]]}),
        new Generator({name: 'Stone Pickaxe', resources: [resources[0], resources[1], resources[2]], costs: [50, 200, 0], outputs: [0, 4, 1], requirements: [research[1]]}),
        new Generator({name: 'Copper Axe', resources: [resources[0], resources[2]], costs: [50, 100], outputs: [25, 0], requirements: [research[2]]}),
        new Generator({name: 'Copper Pickaxe', resources: [resources[0], resources[1], resources[2]], costs: [50, 0, 200], outputs: [0, 10, 3], requirements: [research[2]]})
    ];

    var tabs = [
        new Tab({name: 'Generators', buttons: generators}),
        new Tab({name: 'Research', buttons: research, isActive: true})
    ];

    var list = new List({items: resources});

    var menu = new Menu({tabs: tabs});

    update = function () {
        menu.update();
        list.update();
    };

    draw = function () {
        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, canvas.width, canvas.height);

        menu.draw();
        list.draw();
    };
})();
