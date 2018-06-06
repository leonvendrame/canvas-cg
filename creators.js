function createCircle(coordinates, radius) {
    if (coordinates.length != 4 && coordinates.length != 2) {
        console.log("Erro: Número incorreto de pontos.");
        return;
    }

    var circle = new Circle(coordinates[0], coordinates[1], radius);
    shapesList.push(circle);
    drawCircle(circle);
    const index = shapesList.indexOf(circle);
    selectionList.innerHTML += `<li id="li-${index}" class="li-style" onclick="switchSelection(${index})">Círculo</li>`
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
    const index = shapesList.indexOf(triangle);
    selectionList.innerHTML += `<li id="li-${index}" class="li-style" onclick="switchSelection(${index})">Triângulo</li>`
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
    const index = shapesList.indexOf(line);
    selectionList.innerHTML += `<li id="li-${index}" class="li-style" onclick="switchSelection(${index})">Linha</li>`
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
    const index = shapesList.indexOf(rectangle);
    selectionList.innerHTML += `<li id="li-${index}" class="li-style" onclick="switchSelection(${index})">Retângulo</li>`
}