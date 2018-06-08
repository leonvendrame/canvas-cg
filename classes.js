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
        this.points = {"origin": {"x": x, "y": y}};
        this.points["dest"] = {"x": a, "y": b};
    }
}

class Triangle extends Shape {
    constructor(x, y, a, b, p, q) {
        super();
        this.points = {"origin": {"x": x, "y": y}};
        this.points["dest1"] = {"x": a, "y": b};
        this.points["dest2"] = {"x": p, "y": q};
    }
}

class Circle extends Shape {
    constructor(x, y, r) {
        super();
        this.points = {"center": {"x": x, "y": y}};
        this.radius = r;
    }
}

class Rectangle extends Shape {
    constructor(x, y, a, b) {
        super();
        this.points = {"origin": {"x": x, "y": y}};
        this.points["dest1"] = {"x": x, "y": b};
        this.points["dest2"] = {"x": a, "y": b};
        this.points["dest3"] = {"x": a, "y": y};
    }
}
