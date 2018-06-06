class Shape {
    constructor(selected) {
        this.id = id++;
        this.selected = false;
    }
    getId() {
        return this.id;
    }
}

class Line extends Shape {
    constructor(x, y, a, b) {
        super();
        this.origin = { 'x': x, 'y': y};
        this.dest = {'x': a, 'y': b};
    }
}

class Triangle extends Shape {
    constructor(x, y, a, b, p, q) {
        super();
        this.origin = {'x': x, 'y': y};
        this.dest1 = {'x': a, 'y': b};
        this.dest2 = {'x': p, 'y': q};
    }
}

class Circle extends Shape {
    constructor(x, y, r) {
        super();
        this.center = {'x': x, 'y': y};
        this.radius = r;
    }
}

class Rectangle extends Shape {
    constructor(x, y, a, b) {
        super();
        this.origin = {'x': x, 'y': y};
        this.dest = {'x': a, 'y': b};
    }
}