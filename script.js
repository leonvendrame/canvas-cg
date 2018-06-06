var canvas = document.getElementById("workcanvas");
var commandLine = document.getElementById("commandLine");
var context = canvas.getContext("2d");
var globalOption = 0;
var id = 0;

var coords = [];
var shapesList = [];
var selectedShape = null;

var counts = {line: 2};

var countLine = 2;
var countRectangle = 2;
var countTriangle = 3;
var countCircle = 2;

var minPointX = 0;
var minPointY = 0;
var maxPointX = canvas.width;
var minPointY = canvas.height;

commandLine.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        submitCommandLine();
    }
});


document.body.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 76) {
        cEL(1);
    } 
});

function submitCommandLine() {
    try {
        eval(commandLine.value);
    } catch(err) {
        console.log("Erro: Comando não reconhecido.");
        alert("Erro: Comando não reconhecido.");
    }
    
}

function cEL(button) {
    globalOption = button;
    switch(globalOption) {
        case(1):
            // alert("Clique nos pontos de origem e destino da reta dentro da tela delimitada.");
            document.getElementById("line-btn").classList.add("is-inverted");
            document.getElementById("rectangle-btn").classList.remove("is-inverted");
            document.getElementById("circle-btn").classList.remove("is-inverted");
            document.getElementById("triangle-btn").classList.remove("is-inverted");
            break;
        case(2):
            // alert("Clique nos pontos de origem e destino da diagonal que formará o retângulo dentro da tela delimitada.");
            document.getElementById("line-btn").classList.remove("is-inverted");
            document.getElementById("rectangle-btn").classList.add("is-inverted");
            document.getElementById("circle-btn").classList.remove("is-inverted");
            document.getElementById("triangle-btn").classList.remove("is-inverted");
            break;
        case(3):
            // alert("Clique no ponto que será o centro do círculo e após isso o ponto que definirá o raio do mesmo na tela delimitada.");
            document.getElementById("line-btn").classList.remove("is-inverted");
            document.getElementById("rectangle-btn").classList.remove("is-inverted");
            document.getElementById("circle-btn").classList.add("is-inverted");
            document.getElementById("triangle-btn").classList.remove("is-inverted");
            break;
        case(4):
            // alert("Clique nos três pontos que formarão o retângulo dentro da tela delimitada.");
            document.getElementById("line-btn").classList.remove("is-inverted");
            document.getElementById("rectangle-btn").classList.remove("is-inverted");
            document.getElementById("circle-btn").classList.remove("is-inverted");
            document.getElementById("triangle-btn").classList.add("is-inverted");
            break;
    }
    coords = [];
}

function getPoints(x, y, count, original, func) {
    if (count > 0) {
        coords.push(x, y);
        --count;
    }
    if (count == 0) {
        if (func == createCircle) {
            var radius = Math.abs(Math.hypot(coords[2]-coords[0], coords[3]-coords[1]));
            func(coords, radius);
        } else {
            func(coords);
        }
        coords = [];
        count = original;
    }
    return count;
}

function getLinePoints (x, y) {
    if (countLine > 0) {
        coords.push(x);
        coords.push(y);
        --countLine;
    }
    if (countLine == 0) {
        createLine(coords);
        coords = [];
        countLine = 2;
    }
}

function getRectanglePoints (x, y) {
    if (countRectangle > 0) {
        coords.push(x);
        coords.push(y);
        --countRectangle;
    }
    if (countRectangle == 0) {
        createRectangle(coords);
        coords = [];
        countRectangle = 2;
    }
}

function getTrianglePoints (x, y) {
    if (countTriangle > 0) {
        coords.push(x);
        coords.push(y);
        --countTriangle;
    }
    if (countTriangle == 0) {
        createTriangle(coords);
        coords = [];
        countTriangle = 3;
    }
}

function getCirclePoints (x, y) {
    if (countCircle > 0) {
        coords.push(x);
        coords.push(y);
        --countCircle;
    }
    if (countCircle == 0) {
        var radius = Math.abs(Math.hypot(coords[2]-coords[0], coords[3]-coords[1]));
        createCircle(coords, radius);
        coords = [];
        countCircle = 2;
    }
}

function storeGuess(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    // console.log("X coords: " + x + ", Y coords: " + y);

    if (globalOption == 0) {
        alert("Erro: Nenhuma função selecionada.");
    } else if (globalOption == 1) {
        // getLinePoints(x, y);
        countLine = getPoints(x, y, countLine, 2, createLine);
    } else if (globalOption == 2) {
        // getRectanglePoints(x, y);
        countRectangle = getPoints(x, y, countRectangle, 2, createRectangle);
    } else if (globalOption == 3) {
        // getCirclePoints(x, y);
        countCircle = getPoints(x, y, countCircle, 2, createCircle);
    } else if (globalOption == 4) {
        // getTrianglePoints(x, y);
        countTriangle = getPoints(x, y, countTriangle, 3, createTriangle);
    }
}

function draw(shapeObject) {
    if (shapeObject.selected) {
        var selected = true;
    }
    switch(shapeObject.constructor.name) {        
        case "Line":
            drawLine(shapeObject);
            // drawLine([shapeObject.origin['x'], shapeObject.origin['y'],
            //             shapeObject.dest['x'], shapeObject.dest['y']];
            break;
        case "Triangle":
            drawTriangle(shapeObject);
            // drawTriangle([shapeObject.origin['x'], shapeObject.origin['y'],
            //                 shapeObject.dest1['x'], shapeObject.dest1['y'],
            //                 shapeObject.dest2['x'], shapeObject.dest2['y']]);
            break;
        case "Circle":
            drawCircle(shapeObject);
            // drawCircle([shapeObject.center['x'], shapeObject.center['y']], shapeObject.radius);
            break;
        case "Rectangle":
            drawRectangle(shapeObject);
            // drawRectangle([shapeObject.origin['x'], shapeObject.origin['y'],
            //                 shapeObject.dest3['x'], shapeObject.dest3['y']]);
            break;
    }
}

function reDrawEverything() {
    for (var index in shapesList) {
        draw(shapesList[index]);
    }
}

function clearCanvas(keep) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (keep != true) {
        shapesList = [];
    }
}

function select(shapeObject) {
    if (shapeObject != undefined) {
        for (var index in shapesList) {
            shapesList[index].selected = false;
        }
        shapeObject.selected = true;
        selectedShape = shapeObject;
        clearCanvas(true);
        reDrawEverything();
    }
}

function unselect(shapeObject) {
    if (shapeObject != undefined) {
        shapeObject.selected = false;
        selectedShape = null;
        clearCanvas(true);
        reDrawEverything();
    }
}


