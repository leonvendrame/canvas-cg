const size2D = 3;

function translate(x, y) {
    if (!selectedShape) {
        alert("Erro: Selecione uma forma antes de aplicar a escala.");
    } else {
        var shapeObjectMatrix = toHomogeneousMatrix(selectedShape);
    }
    if (arguments.length == 1) {
        y = x;
    }

    var translationM = translationMatrix(x, y);
    var newPointsVector = [];
    var newPointsMatrix;
    var recreate;

    newPointsMatrix = multiply(translationM, shapeObjectMatrix);

    for (var j = 0; j < shapeObjectMatrix[0].length; j++) {
        for (var i = 0; i < size2D - 1; i++) {
            newPointsVector.push(newPointsMatrix[i][j]);
        }
    }
    
    if (selectedShape.constructor.name == "Circle") {
        updatePoints(newPointsVector, selectedShape, selectedShape.radius);
    } else {
        updatePoints(newPointsVector, selectedShape);
    }
    
    clearCanvas(true);
    reDrawEverything();
}

function scale(x, y, a, b) {
    if (!selectedShape) {
        alert("Erro: Selecione uma forma antes de aplicar a escala.");
        return;
    } else {
        var shapeObjectMatrix = toHomogeneousMatrix(selectedShape);
    }
    if (arguments.length == 1) {
        if (selectedShape.constructor.name == "Circle") {
            scaleCircle(x);
            return;
        } else {
            y = x;
        }
    }

    if (!a || !b) {
        a = selectedShape.points["origin"]["x"];
        b = selectedShape.points["origin"]["y"];
    }
    var scaleM = scaleMatrix(x, y);;
    var newPointsVector = [];
    var newPointsMatrix;
    var translateToOrigin = translationMatrix(-a, -b);
    var translateBack = translationMatrix(a, b);
    
    newPointsMatrix = multiply(translateBack, scaleM);
    newPointsMatrix = multiply(newPointsMatrix, translateToOrigin);
    newPointsMatrix = multiply(newPointsMatrix, shapeObjectMatrix);

    for (var j = 0; j < shapeObjectMatrix[0].length; j++) {
        for (var i = 0; i < size2D - 1; i++) {
            newPointsVector.push(newPointsMatrix[i][j]);
        }
    }

    updatePoints(newPointsVector, selectedShape);
    clearCanvas(true);
    reDrawEverything();
}

function scaleCircle(scale) {
    selectedShape.radius = selectedShape.radius * scale;
    clearCanvas(true);
    reDrawEverything();
}

function rotate(angle, a, b) {
    if (!selectedShape) {
        alert("Erro: Selecione uma forma antes de aplicar a escala.");
    } else {
        var shapeObjectMatrix = toHomogeneousMatrix(selectedShape);
    }

    if (!a || !b) {
        a = selectedShape.points["origin"]["x"];
        b = selectedShape.points["origin"]["y"];
    }

    var rotateM = rotationMatrix(angle);
    var newPointsVector = [];
    var newPointsMatrix;
    var translateToOrigin = translationMatrix(-a, -b);
    var translateBack = translationMatrix(a, b);
    
    newPointsMatrix = multiply(translateBack, rotateM);
    newPointsMatrix = multiply(newPointsMatrix, translateToOrigin);
    newPointsMatrix = multiply(newPointsMatrix, shapeObjectMatrix);

    for (var j = 0; j < shapeObjectMatrix[0].length; j++) {
        for (var i = 0; i < size2D - 1; i++) {
            newPointsVector.push(newPointsMatrix[i][j]);
        }
    }

    updatePoints(newPointsVector, selectedShape);
    clearCanvas(true);
    reDrawEverything();
}

function multiply(matrixA, matrixB) {
    var matrixResult = [];

    for (var i = 0; i < 4; i++) {
        matrixResult[i] = [];
    }

    for (var i = 0; i < matrixA.length; i++) {
        for (var j = 0; j < matrixB[0].length; j++) {
            matrixResult[i][j] = 0;
        }
    }

    for (var i = 0; i < matrixA.length; i++) {
        for (var j = 0; j < matrixB[0].length; j++) {
            for (var k = 0; k < matrixA[0].length; k++) {
                matrixResult[i][j] = matrixResult[i][j] + matrixA[i][k] * matrixB[k][j];
            }
        }
    }

    return matrixResult;
}

function zoomExtend() {
    var xMin = canvas.width;
    var xMax = 0;
    var yMin = canvas.height;
    var yMax = 0;
    var newXMin = 50;
    var newXMax = canvas.width - 50;
    var newYMin = 50;
    var newYMax = canvas.height - 50;

    for (let shapeObject of shapesList) {
        if (shapeObject.constructor.name != "Circle") {
            for (let points of Object.keys(shapeObject.points)) {
                if (shapeObject.points[points]["x"] < xMin) {
                    xMin = shapeObject.points[points]["x"];
                } if (shapeObject.points[points]["x"] > xMax) {
                    xMax = shapeObject.points[points]["x"];
                } if (shapeObject.points[points]["y"] < yMin) {
                    yMin = shapeObject.points[points]["y"];
                } if (shapeObject.points[points]["y"] > yMax) {
                    yMax = shapeObject.points[points]["y"];
                }
            }
        }
    }

    console.log(xMin, xMax, yMin, yMax);
}