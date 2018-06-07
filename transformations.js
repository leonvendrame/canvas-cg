const size2D = 3;

function toHomogeneousMatrix(shapeObject) {
    var pointsList = [];
    const properties = Object.getOwnPropertyNames(shapeObject);
    const propertiesList = ["origin", "dest", "dest1", "dest2", "center", "radius"];
    var countPoints = 0;
    var matrix = [];

    for (var property of propertiesList) {
        if (properties.includes(property)) {
            // console.log(property);
            // console.log(shapeObject[property]);
            if (property == "radius") {
                pointsList.push(shapeObject[property]);    
            } else {
                pointsList.push(shapeObject[property]['x']);
                pointsList.push(shapeObject[property]['y']);
                pointsList.push(1);
                countPoints++;
            }
        }        
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

function scale(x, y) {
    var scaleMatrix = [];
    var newPointsVector = [];
    var newPointsMatrix;

    for (var i = 0; i < size2D; i++) {
        scaleMatrix[i] = [];
    }

    for (var i = 0; i < size2D; i++) {
        for (var j = 0; j < size2D; j++) {
            scaleMatrix[i][j] = 0;
        }
    }

    scaleMatrix[0][0] = x;
    scaleMatrix[1][1] = y;
    scaleMatrix[2][2] = 1;

    if (!selectedShape) {
        alert("Erro: Selecione uma forma antes de aplicar a escala.");
    } else {
        var shapeObjectMatrix = toHomogeneousMatrix(selectedShape);
    }

    newPointsMatrix = multiply(scaleMatrix, shapeObjectMatrix);

    for (var j = 0; j < shapeObjectMatrix[0].length; j++) {
        for (var i = 0; i < size2D - 1; i++) {
            newPointsVector.push(newPointsMatrix[i][j]);
        }
    }
    
    console.log(shapeObjectMatrix);
    console.log(newPointsVector);

    // return newPointsVector;
    remove();
    createLine(newPointsVector);
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