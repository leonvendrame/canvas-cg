var canvas = document.getElementById("workcanvas");
var commandLine = document.getElementById("commandLine");
var context = canvas.getContext("2d");
var selectionList = document.getElementById("shapes");
var globalOption = 0;
var id = 0;

var secondClick = false;

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
        changeFunction(1);
    } 
});

function submitCommandLine() {
    const commandDict = {
        "line": "createLine(commands);",
        "rectangle": "createRectangle(commands);",
        "circle": "createCircle(commands);",
        "triangle": "createTriangle(commands);",
        "select": "select(commands[0]);",
        "unselect": "unselect(commands[0]);",
        "scale": "scale(commands[0], commands[1], commands[2], commands[3]);",
        "scaleOrigin": "scale(commands[0], commands[1]);",
        "rotate": "rotate(commands[0]);",
        "translate": "translate(commands[0], commands[1]);"
    };

    try {
        var commands = commandLine.value.split(" ");
        var shape = commands.shift();
        if (!commandDict[shape]) throw "Erro: Comando não reconhecido.";
        const createCommandLine = commandDict[shape];
        console.log(createCommandLine);
        eval(createCommandLine);
    } catch(err) {
        console.log("Erro: Comando não reconhecido.");
        alert("Erro: Comando não reconhecido.");
    }
}

function changeFunction(button) {
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
        case(7):
            secondClick = callScale(secondClick);
            document.getElementById("line-btn").classList.remove("is-inverted");
            document.getElementById("rectangle-btn").classList.remove("is-inverted");
            document.getElementById("circle-btn").classList.remove("is-inverted");
            document.getElementById("triangle-btn").classList.remove("is-inverted");
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

function storeGuess(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    
    if (secondClick) {
        secondClick = callScale(secondClick, [x, y]);
    } else if (globalOption == 0) {
        alert("Erro: Nenhuma função selecionada.");
    } else if (globalOption == 1) {
        countLine = getPoints(x, y, countLine, 2, createLine);
    } else if (globalOption == 2) {
        countRectangle = getPoints(x, y, countRectangle, 2, createRectangle);
    } else if (globalOption == 3) {
        countCircle = getPoints(x, y, countCircle, 2, createCircle);
    } else if (globalOption == 4) {
        countTriangle = getPoints(x, y, countTriangle, 3, createTriangle);
    }
}

function getMousePos(event) {
    var x = event.offsetX;
    var y = event.offsetY;

    document.getElementById("mouse-position").innerHTML = `Posição X: ${x} Y: ${y}`;
}

function draw(shapeObject) {
    if (shapeObject.selected) {
        var selected = true;
    }
    switch(shapeObject.constructor.name) {        
        case "Line":
            drawLine(shapeObject);
            break;
        case "Triangle":
            drawTriangle(shapeObject);
            break;
        case "Circle":
            drawCircle(shapeObject);
            break;
        case "Rectangle":
            drawRectangle(shapeObject);
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
        selectionList.innerHTML = `<li id="selection-list-title">Selecione</li>`
    }
}

// createLine([23, 34, 160, 250]);
// createCircle([23, 120], 45);
// createRectangle([23, 54, 65, 87]);
// createTriangle([23, 43, 65, 76, 222, 111]);
// select(0);