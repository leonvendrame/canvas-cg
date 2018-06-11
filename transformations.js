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

    updatePoints(newPointsVector, selectedShape);
    clearCanvas(true);
    reDrawEverything();
}

function scale(x, y, a = selectedShape.points["origin"]["x"], b = selectedShape.points["origin"]["y"]) {
    if (!selectedShape) {
        alert("Erro: Selecione uma forma antes de aplicar a escala.");
        return;
    } else {
        var shapeObjectMatrix = toHomogeneousMatrix(selectedShape);
    }
    if (arguments.length == 1) {
        if (selectedShape.constructor.name == "Circle") {
            return scaleCircles(x);
        } else {
            y = x;
        }
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

function scaleCircles(scale) {
    selectedShape.radius = selectedShape.radius * scale;
}

function rotate(angle) {
    if (!selectedShape) {
        alert("Erro: Selecione uma forma antes de aplicar a escala.");
    } else {
        var shapeObjectMatrix = toHomogeneousMatrix(selectedShape);
    }

    var rotateM = rotationMatrix(angle);
    var newPointsVector = [];
    var newPointsMatrix;
    var translateToOrigin = translationMatrix(-selectedShape.points["origin"]["x"], -selectedShape.points["origin"]["y"]);
    var translateBack = translationMatrix(selectedShape.points["origin"]["x"], selectedShape.points["origin"]["y"]);
    
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