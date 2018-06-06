function createCircle(coordinates, radius) {
    if (coordinates.length != 4 && coordinates.length != 2) {
        console.log("Erro: Número incorreto de pontos.");
        return;
    }

    var circle = new Circle(coordinates[0], coordinates[1], radius);
    shapesList.push(circle);
    drawCircle(circle);
}

function createTriangle(coordinates) {
    if (coordinates.length != 6) {
        console.log("Erro: Número incorreto de pontos.");
        return;
    }
    
    var triangle = new Triangle(coordinates[0], coordinates[1],
                                coordinates[2], coordinates[3],
                                coordinates[4], coordinates[5]);
    shapesList.push(triangle);
    drawTriangle(triangle);
}

function createLine(coordinates) {
    if (coordinates.length != 4) {
        console.log("Erro: Número incorreto de pontos.");
        return;
    }

    var line = new Line(coordinates[0], coordinates[1],
                        coordinates[2], coordinates[3]);
    shapesList.push(line);
    drawLine(line);
}

function createRectangle(coordinates) {
    if (coordinates.length != 4) {
        console.log("Erro: Número incorreto de pontos.");
        return;
    }

    var rectangle = new Rectangle(coordinates[0], coordinates[1],
                                    coordinates[2], coordinates[3]);
    shapesList.push(rectangle);
    drawRectangle(rectangle);
}