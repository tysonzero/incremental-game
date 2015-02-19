(function () {
    Resource.objects = [
        new Resource({name: 'Wood', quantity: 100}),
        new Resource({name: 'Stone'}),
        new Resource({name: 'Copper'})
    ];

    Research.objects = [
        new Research({name: 'Wooden Tools', resources: [Resource.objects[0]], costs: [100]}),
        new Research({name: 'Stone Tools', resources: [Resource.objects[1]], costs: [100]}),
        new Research({name: 'Copper Tools', resources: [Resource.objects[2]], costs: [100]})
    ];
    Research.objects[1].requirements.push(Research.objects[0]);
    Research.objects[2].requirements.push(Research.objects[1]);

    Generator.objects = [
        new Generator({name: 'Wooden Axe', quantity: 1, resources: [Resource.objects[0]], costs: [150], outputs: [5], requirements: [Research.objects[0]]}),
        new Generator({name: 'Wooden Pickaxe', resources: [Resource.objects[0], Resource.objects[1]], costs: [250, 0], outputs: [0, 2], requirements: [Research.objects[0]]}),
        new Generator({name: 'Stone Axe', resources: [Resource.objects[0], Resource.objects[1]], costs: [50, 100], outputs: [10, 0], requirements: [Research.objects[1]]}),
        new Generator({name: 'Stone Pickaxe', resources: [Resource.objects[0], Resource.objects[1], Resource.objects[2]], costs: [50, 200, 0], outputs: [0, 4, 1], requirements: [Research.objects[1]]}),
        new Generator({name: 'Copper Axe', resources: [Resource.objects[0], Resource.objects[2]], costs: [50, 100], outputs: [25, 0], requirements: [Research.objects[2]]}),
        new Generator({name: 'Copper Pickaxe', resources: [Resource.objects[0], Resource.objects[1], Resource.objects[2]], costs: [50, 0, 200], outputs: [0, 10, 3], requirements: [Research.objects[2]]})
    ];

    Tab.objects = [
        new Tab({name: 'Generators', buttons: Generator.objects}),
        new Tab({name: 'Research', buttons: Research.objects, isActive: true})
    ];

    list = new List({items: Resource.objects});

    menu = new Menu({tabs: Tab.objects});

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
