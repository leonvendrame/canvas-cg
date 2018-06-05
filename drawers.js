function drawCircle(coordinates, radius) {

    if (coordinates.length != 4 && coordinates.length != 2) {
        console.log("Erro: Número incorreto de pontos.");
        return;
    }

    var circle = new Circle(coordinates[0], coordinates[1], radius);
    shapesList.push(circle);

    context.beginPath();
    context.arc(coordinates[0], coordinates[1], radius, 0, 2*Math.PI);
    context.stroke();
    context.closePath();
}

function drawTriangle(coordinates) {

    if (coordinates.length != 6) {
        console.log("Erro: Número incorreto de pontos.");
        return;
    }
    
    var triangle = new Triangle(coordinates[0], coordinates[1],
                                coordinates[2], coordinates[3],
                                coordinates[4], coordinates[5]);

    shapesList.push(triangle);
    context.beginPath();
    context.moveTo(coordinates[0], coordinates[1]);
    context.lineTo(coordinates[2], coordinates[3]);
    context.moveTo(coordinates[2], coordinates[3]);
    context.lineTo(coordinates[4], coordinates[5]);
    context.moveTo(coordinates[4], coordinates[5]);
    context.lineTo(coordinates[0], coordinates[1]);
    context.stroke();
    context.closePath();
}

function drawLine(coordinates, modifier) {
    context.beginPath();

    if (coordinates.length != 4) {
        console.log("Erro: Número incorreto de pontos.");
        return;
    }

    var line = new Line(coordinates[0], coordinates[1],
                        coordinates[2], coordinates[3]);

    shapesList.push(line);

    context.moveTo(coordinates[0], coordinates[1]);
    context.lineTo(coordinates[2], coordinates[3]);
    if (modifier != undefined) {
        context.strokeStyle = "red";
    }
    
    context.stroke();
    context.closePath();
}

function drawRectangle(coordinates, selected) {
    context.beginPath();

    if (coordinates.length != 4) {
        console.log("Erro: Número incorreto de pontos.");
        return;
    }

    var rectangle = new Rectangle(coordinates[0], coordinates[1],
                                    coordinates[2], coordinates[3]);
    shapesList.push(rectangle);

    context.moveTo(coordinates[0], coordinates[1]);
    context.lineTo(coordinates[0], coordinates[3]);
    context.moveTo(coordinates[0], coordinates[3]);
    context.lineTo(coordinates[2], coordinates[3]);
    context.moveTo(coordinates[2], coordinates[3]);
    context.lineTo(coordinates[2], coordinates[1]);
    context.moveTo(coordinates[2], coordinates[1]);
    context.lineTo(coordinates[0], coordinates[1]);
    if (selected) {
        context.strokeStyle = "red"
    }
    context.stroke();
    context.closePath();
    resetStrokeColor();
}