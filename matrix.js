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

function translationMatrix(x, y) {
    var translatePoint = [x, y];
    var translationMatrix = [];

    for (var i = 0; i < size2D; i++) {
        translationMatrix[i] = [];
    }

    for (var i = 0; i < size2D; i++) {
        for (var j = 0; j < size2D; j++) {
            if (i == j) {
                translationMatrix[i][j] = 1;    
            } else if (j == size2D - 1) {
                translationMatrix[i][j] = translatePoint.shift();
            } else {
                translationMatrix[i][j] = 0;
            }
        }
    }

    return translationMatrix;
}

function scaleMatrix(x, y) {
    var scalePoint = [x, y];
    var scaleMatrix = [];

    for (var i = 0; i < size2D; i++) {
        scaleMatrix[i] = [];
    }

    for (var i = 0; i < size2D; i++) {
        for (var j = 0; j < size2D; j++) {
            if (i == j) {
                if (scalePoint.length > 0) {
                    scaleMatrix[i][j] = scalePoint.shift();
                } else {
                    scaleMatrix[i][j] = 1;    
                }
            } else {
                scaleMatrix[i][j] = 0;
            }
        }
    }

    return scaleMatrix;
}

function rotationMatrix(angle) {
    var rotationMatrix = [];

    angle = angle * (Math.PI / 180);

    for (var i = 0; i < size2D; i++) {
        rotationMatrix[i] = [];
    }

    for (var i = 0; i < size2D; i++) {
        for (var j = 0; j < size2D; j++) {
            if (i == j && i != size2D - 1) {
                rotationMatrix[i][j] = Math.cos(angle);
            } else if (i == j) {
                rotationMatrix[i][j] = 1;
            } else {
                rotationMatrix[i][j] = 0;
            }
        }
    }

    rotationMatrix[0][1] = Math.sin(angle);
    rotationMatrix[1][0] = - Math.sin(angle);

    return rotationMatrix;
}
