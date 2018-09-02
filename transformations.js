const size2D = 3;

function translate(x, y) {
    if (!selectedShape) {
        alert("Erro: Selecione uma forma antes de aplicar a escala.");
        return;
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
    var scaleM = scaleMatrix(x, y);
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
        return;
    } else {
        var shapeObjectMatrix = toHomogeneousMatrix(selectedShape);
    }

    if (!a || !b) {
        if (selectedShape.constructor.name == "Circle") {
            a = selectedShape.points["center"]["x"];
            b = selectedShape.points["center"]["y"];
        } else {
            a = selectedShape.points["origin"]["x"];
            b = selectedShape.points["origin"]["y"];
        }
    }

    if (selectedShape.constructor.name == "Circle") {
        var radius = selectedShape.radius;
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

    updatePoints(newPointsVector, selectedShape, radius);
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

function windowViewPort(xMin, xMax, yMin, yMax, uMin, uMax, vMin, vMax) {
    if (!selectedShape) {
        alert("Erro: Selecione uma forma antes de aplicar a escala.");
        return;
    } else {
        var shapeObjectMatrix = toHomogeneousMatrix(selectedShape);
    }

    if (selectedShape.constructor.name == "Circle") {
        var radius = selectedShape.radius;
        var rectangle = [selectedShape.points["center"]["x"] - radius,
                        selectedShape.points["center"]["y"] - radius,
                        selectedShape.points["center"]["x"] + radius,
                        selectedShape.points["center"]["y"] + radius];
        
        shapeObjectMatrix = [[rectangle[0], rectangle[2]], [rectangle[1], rectangle[3]], [1, 1]];
    }

    var x = (uMax - uMin) / (xMax - xMin);
    var y = (vMax - vMin) / (yMax - yMin);

    var scaleViewPort = scaleMatrix(x, y);
    var newPointsVector = [];
    var newPointsMatrix;
    var translateToOrigin = translationMatrix(-xMin, -yMin);
    var translateBack = translationMatrix(uMin, vMin);
    
    newPointsMatrix = multiply(translateBack, scaleViewPort);
    newPointsMatrix = multiply(newPointsMatrix, translateToOrigin);
    newPointsMatrix = multiply(newPointsMatrix, shapeObjectMatrix);

    if (selectedShape.constructor.name != "Circle") {
        for (var j = 0; j < shapeObjectMatrix[0].length; j++) {
            for (var i = 0; i < size2D - 1; i++) {
                newPointsVector.push(newPointsMatrix[i][j]);
            }
        }
    } else {
        rectangle[0] = newPointsMatrix[0][0];
        rectangle[1] = newPointsMatrix[1][0];
        rectangle[2] = newPointsMatrix[0][1];
        rectangle[3] = newPointsMatrix[1][1];

        if (Math.abs(rectangle[3] - rectangle[1]) < Math.abs(rectangle[2] - rectangle[0])) {
            newPointsVector.push((rectangle[2] + rectangle[0]) / 2);
            newPointsVector.push((rectangle[3] + rectangle[1]) / 2);
            radius = ((rectangle[3] + rectangle[1]) / 2) - rectangle[1];
        } else {
            newPointsVector.push((rectangle[2] + rectangle[0]) / 2);
            newPointsVector.push((rectangle[3] + rectangle[1]) / 2);
            radius = ((rectangle[2] + rectangle[0]) / 2) - rectangle[0];
        }
    }

    updatePoints(newPointsVector, selectedShape, radius);
}

/* function zoomExtend() {
    var xMin = 999999;
    var xMax = -99999;
    var yMin = 999999;
    var yMax = -99999;

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
        } else {
            if ((shapeObject.points["center"]["x"] - shapeObject.radius) < xMin) {
                xMin = shapeObject.points["center"]["x"] - shapeObject.radius;
            } if ((shapeObject.points["center"]["x"] + shapeObject.radius) > xMax) {
                xMax = shapeObject.points["center"]["x"] + shapeObject.radius;
            } if ((shapeObject.points["center"]["y"] - shapeObject.radius) < yMin) {
                yMin = shapeObject.points["center"]["y"] - shapeObject.radius;
            } if ((shapeObject.points["center"]["y"] + shapeObject.radius) > yMax) {
                yMax = shapeObject.points["center"]["y"] + shapeObject.radius;
            }
        }
    }

    xMin -= 20;
    xMax += 20;
    yMin -= 20;
    yMax += 20;

    var centerDrawing = {}; var centerCanvas = {};
    var trans = {};

    centerDrawing["x"] = (xMax + xMin) / 2;
    centerDrawing["y"] = (yMax + yMin) / 2;

    console.log("center d: ", centerDrawing["x"], centerDrawing["y"]);

    centerCanvas["x"] = canvas.width / 2;
    centerCanvas["y"] = canvas.height / 2;

    console.log("center c: ", centerCanvas["x"], centerCanvas["y"]);

    trans["x"] = centerDrawing["x"] - centerCanvas["x"];
    trans["y"] = centerDrawing["y"] - centerCanvas["y"];

    for (let index in shapesList) {
        select(index);
        translate(-trans["x"], -trans["y"]);
        unselect();
    }

    console.log(trans["x"], trans["y"]);

    //createRectangle([xMin, yMin, xMax, yMax]);

    console.log(xMin, xMax, yMin, yMax);
    clearCanvas(true);
    reDrawEverything();
}

*/

function realZoomExtend() {
    var xMin = 999999;
    var xMax = -99999;
    var yMin = 999999;
    var yMax = -99999;

    var uMin, uMax, vMin, vMax;

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
        } else {
            if ((shapeObject.points["center"]["x"] - shapeObject.radius) < xMin) {
                xMin = shapeObject.points["center"]["x"] - shapeObject.radius;
            } if ((shapeObject.points["center"]["x"] + shapeObject.radius) > xMax) {
                xMax = shapeObject.points["center"]["x"] + shapeObject.radius;
            } if ((shapeObject.points["center"]["y"] - shapeObject.radius) < yMin) {
                yMin = shapeObject.points["center"]["y"] - shapeObject.radius;
            } if ((shapeObject.points["center"]["y"] + shapeObject.radius) > yMax) {
                yMax = shapeObject.points["center"]["y"] + shapeObject.radius;
            }
        }
    }

    xMin -= 20;
    xMax += 20;
    yMin -= 20;
    yMax += 20;

    uMin = 20;
    uMax = canvas.width - 20;
    vMin = 20;
    vMax = canvas.height - 20;

    for (var shapeObject in shapesList) {
        select(shapeObject);
        windowViewPort(xMin, xMax, yMin, yMax, uMin, uMax, vMin, vMax);
        unselect();
    }

    clearCanvas(true);
    reDrawEverything();
}