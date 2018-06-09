const size2D = 3;

function toHomogeneousMatrix(shapeObject) {
    var pointsList = [];
    var countPoints = 0;
    const keys = Object.keys(shapeObject.points);
    // console.log(keys);
    var matrix = [];

    for (var key of keys) {
        pointsList.push(shapeObject.points[key]['x']);
        pointsList.push(shapeObject.points[key]['y']);
        pointsList.push(1);
        countPoints++;
        // if (shapeObject.constructor.name == "Circle") {
        //     pointsList.push(shapeObject.radius);
        // }
    }

    for (var i = 0; i < size2D; i++) {
        matrix[i] = [];
    }

    for (var j = 0; j < countPoints; j++) {
        for (var i = 0; i < size2D; i++) {
            matrix[i][j] = pointsList.shift();
            pointsList.push(matrix[i][j]);
        }
    }

    return matrix;
}

function translate(x, y) {
    if (!selectedShape) {
        alert("Erro: Selecione uma forma antes de aplicar a escala.");
    } else {
        var shapeObjectMatrix = toHomogeneousMatrix(selectedShape);
    }
    if (arguments.length == 1) {
        y = x;
    }

    var transMatrix = translationMatrix(x, y);
    var newPointsVector = [];
    var newPointsMatrix;
    var recreate;

    newPointsMatrix = multiply(transMatrix, shapeObjectMatrix);

    for (var j = 0; j < shapeObjectMatrix[0].length; j++) {
        for (var i = 0; i < size2D - 1; i++) {
            newPointsVector.push(newPointsMatrix[i][j]);
        }
    }

    if (selectedShape.constructor.name == "Rectangle") {
        newPointsVector.splice(2, 2);
        newPointsVector.splice(4, 2);
        recreate = `create${selectedShape.constructor.name}(newPointsVector);`
    } else if (selectedShape.constructor.name == "Circle") {
        recreate = `create${selectedShape.constructor.name}(newPointsVector, ${selectedShape.radius});`
    } else {
        recreate = `create${selectedShape.constructor.name}(newPointsVector);`
    }

    remove();
    eval(recreate);
    select(shapesList.length - 1);
    clearCanvas(true);
    reDrawEverything();
}

function scale(x, y) {
    if (!selectedShape) {
        alert("Erro: Selecione uma forma antes de aplicar a escala.");
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
    var translateToOrigin = translationMatrix(-selectedShape.points["origin"]["x"], -selectedShape.points["origin"]["y"]);
    var translateBack = translationMatrix(selectedShape.points["origin"]["x"], selectedShape.points["origin"]["y"]);
    
    newPointsMatrix = multiply(translateBack, scaleM);
    newPointsMatrix = multiply(newPointsMatrix, translateToOrigin);
    newPointsMatrix = multiply(newPointsMatrix, shapeObjectMatrix);

    for (var j = 0; j < shapeObjectMatrix[0].length; j++) {
        for (var i = 0; i < size2D - 1; i++) {
            newPointsVector.push(newPointsMatrix[i][j]);
        }
    }

    var recreate;

    if (selectedShape.constructor.name == "Rectangle") {
        newPointsVector.splice(2, 2);
        newPointsVector.splice(4, 2);
        recreate = `create${selectedShape.constructor.name}(newPointsVector);`
    } else if (selectedShape.constructor.name == "Circle") {
        recreate = `create${selectedShape.constructor.name}(newPointsVector, ${selectedShape.radius});`
    } else {
        recreate = `create${selectedShape.constructor.name}(newPointsVector);`
    }

    remove();
    // createLine(newPointsVector);
    console.log(recreate);
    eval(recreate);
    select(shapesList.length - 1);
    clearCanvas(true);
    reDrawEverything();
}

function scaleCircles(radius) {
    console.log("É um circulo, raio " + radius);
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