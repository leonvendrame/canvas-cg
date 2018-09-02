/*  Aluno: Leonardo Vendrame     RA: 90562
    O código não está otimizado, podendo possuir alguns pequenos problemas. */

var canvas = document.getElementById("workcanvas");
var commandLine = document.getElementById("commandLine");
var context = canvas.getContext("2d");
var selectionList = document.getElementById("shapes");

context.canvas.width = window.innerWidth - 200;
context.canvas.height = window.innerHeight - 200;

var globalOption = 0;
var id = 0;
var firstTimeShape = {"line": true, "circle": true, "rectangle": true, "triangle":true};
var firstTimeOption = {"scale": true, "translation": true, "rotation": true};
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

window.addEventListener('resize', function(event){
    context.canvas.width = window.innerWidth - 200;
    context.canvas.height = window.innerHeight - 200;
    reDrawEverything();
});

commandLine.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        submitCommandLine();
    }
});

function submitCommandLine() {
    const commandDict = {
        "line": "createLine(commands);",
        "rectangle": "createRectangle(commands);",
        "circle": "createCircle([commands[0], commands[1]], commands[2]);",
        "triangle": "createTriangle(commands);",
        "select": "select(commands[0]);",
        "unselect": "unselect(commands[0]);",
        "scale": "scale(commands[0], commands[1], commands[2], commands[3]);",
        "rotate": "rotate(commands[0], commands[1], commands[2]);",
        "translate": "translate(commands[0], commands[1]);",
        "extend": "realZoomExtend();",
        "remove": "remove();",
        "clear": "clearCanvas();"
    };

    try {
        var commands = commandLine.value.split(" ");
        var shape = commands.shift();
        if (!commandDict[shape]) throw "Erro: Comando não reconhecido.";
        const createCommandLine = commandDict[shape];
        // console.log(createCommandLine);
        for (let cmd in commands) {
            commands[cmd] = Number(commands[cmd]);
        }
        eval(createCommandLine);
    } catch(err) {
        console.log(err);
        alert(err);
    }
}

function changeFunction(button) {
    globalOption = button;
    secondClick = false;
    switch(globalOption) {
        case(0):
            secondClick = false;
            document.getElementById("line-btn").classList.remove("is-inverted");
            document.getElementById("rectangle-btn").classList.remove("is-inverted");
            document.getElementById("circle-btn").classList.remove("is-inverted");
            document.getElementById("triangle-btn").classList.remove("is-inverted");
            document.getElementById("translation-btn").classList.remove("is-inverted");
            document.getElementById("rotation-btn").classList.remove("is-inverted");
            document.getElementById("scale-btn").classList.remove("is-inverted");
            break;

        case(1):
            document.getElementById("line-btn").classList.add("is-inverted");
            document.getElementById("rectangle-btn").classList.remove("is-inverted");
            document.getElementById("circle-btn").classList.remove("is-inverted");
            document.getElementById("triangle-btn").classList.remove("is-inverted");
            document.getElementById("translation-btn").classList.remove("is-inverted");
            document.getElementById("rotation-btn").classList.remove("is-inverted");
            document.getElementById("scale-btn").classList.remove("is-inverted");
            if (firstTimeShape["line"]) {
                alert("Clique nos pontos de origem e destino da reta dentro da tela delimitada.");
                firstTimeShape["line"] = false;
            }
            break;

        case(2):
            document.getElementById("line-btn").classList.remove("is-inverted");
            document.getElementById("rectangle-btn").classList.add("is-inverted");
            document.getElementById("circle-btn").classList.remove("is-inverted");
            document.getElementById("triangle-btn").classList.remove("is-inverted");
            document.getElementById("translation-btn").classList.remove("is-inverted");
            document.getElementById("rotation-btn").classList.remove("is-inverted");
            document.getElementById("scale-btn").classList.remove("is-inverted");
            if (firstTimeShape["rectangle"]) {
                alert("Clique nos pontos de origem e destino da diagonal que formará o retângulo dentro da tela delimitada.");
                firstTimeShape["rectangle"] = false;
            }
            break;

        case(3):
            document.getElementById("line-btn").classList.remove("is-inverted");
            document.getElementById("rectangle-btn").classList.remove("is-inverted");
            document.getElementById("circle-btn").classList.add("is-inverted");
            document.getElementById("triangle-btn").classList.remove("is-inverted");
            document.getElementById("translation-btn").classList.remove("is-inverted");
            document.getElementById("rotation-btn").classList.remove("is-inverted");
            document.getElementById("scale-btn").classList.remove("is-inverted");
            if (firstTimeShape["circle"]) {
                alert("Clique no ponto que será o centro do círculo e após isso o ponto que definirá o raio do mesmo na tela delimitada.");
                firstTimeShape["circle"] = false;
            }
            break;

        case(4):
            document.getElementById("line-btn").classList.remove("is-inverted");
            document.getElementById("rectangle-btn").classList.remove("is-inverted");
            document.getElementById("circle-btn").classList.remove("is-inverted");
            document.getElementById("triangle-btn").classList.add("is-inverted");
            document.getElementById("translation-btn").classList.remove("is-inverted");
            document.getElementById("rotation-btn").classList.remove("is-inverted");
            document.getElementById("scale-btn").classList.remove("is-inverted");
            if (firstTimeShape["triangle"]) {
                alert("Clique nos três pontos que formarão o triângulo dentro da tela delimitada.");
                firstTimeShape["triangle"] = false;
            }
            break;

        case(5):
            secondClick = callTranslation();
            document.getElementById("line-btn").classList.remove("is-inverted");
            document.getElementById("rectangle-btn").classList.remove("is-inverted");
            document.getElementById("circle-btn").classList.remove("is-inverted");
            document.getElementById("triangle-btn").classList.remove("is-inverted");
            break;

        case(6):
            secondClick = callRotation(secondClick);
            document.getElementById("line-btn").classList.remove("is-inverted");
            document.getElementById("rectangle-btn").classList.remove("is-inverted");
            document.getElementById("circle-btn").classList.remove("is-inverted");
            document.getElementById("triangle-btn").classList.remove("is-inverted");
            document.getElementById("scale-btn").classList.remove("is-inverted");
            break;

        case(7):
            secondClick = callScale(secondClick);
            document.getElementById("line-btn").classList.remove("is-inverted");
            document.getElementById("rectangle-btn").classList.remove("is-inverted");
            document.getElementById("circle-btn").classList.remove("is-inverted");
            document.getElementById("triangle-btn").classList.remove("is-inverted");
            break;
    }
    coords = [];
}

var liveRefresh = false;

function getPoints(x, y, count, original, func) {
    if (count > 0) {
        coords.push(x, y);
        --count;
        liveRefresh = true;
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
        liveRefresh = false;
    }
    return count;
}

function storeGuess(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    
    if (globalOption == 5 || globalOption == 6 || globalOption == 7) {
        if (secondClick) {
            if (globalOption == 5) {
                secondClick = callScale(secondClick, [x, y]);
            } else if (globalOption == 6) {
                secondClick = callRotation(secondClick, [x, y]);
            } else if (globalOption == 7) {
                secondClick = callScale(secondClick, [x, y]);
            }
        }
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
    clearCanvas(true);
    reDrawEverything();
}

var points = {};
var firstClick = true;

function clickEvent(event) {
    var x = event.offsetX;
    var y = event.offsetY;

    coords.push(x, y);

    if (firstClick) {
        firstClick = false;
    } else {
        createLine(coords);
        clearCanvas(true);
        reDrawEverything();
        firstClick = true;
        coords = [];
    }
}

function currentLine(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    document.getElementById("mouse-position").innerHTML = `Posição X: ${x} Y: ${y}`;

    if (liveRefresh) {
        clearCanvas(true);
        reDrawEverything();
        if (globalOption == 1) {
            context.beginPath();
            context.moveTo(coords[0], coords[1]);
            context.lineTo(x, y);
            context.stroke();
            context.closePath();
        } else if (globalOption == 2) {
            context.beginPath();
            context.moveTo(coords[0], coords[1]);
            context.lineTo(x, coords[1]);
            context.lineTo(x, y);
            context.lineTo(coords[0], y);
            context.closePath();
            context.stroke();
        } else if (globalOption == 3) {
            context.beginPath();
            var radius = Math.abs(Math.hypot(x-coords[0], y-coords[1]));
            // context.moveTo(coords[0], coords[1]);
            context.arc(coords[0], coords[1], radius, 0, 2 * Math.PI);
            context.stroke();
            context.closePath();
        } else if (globalOption == 4) {
            context.beginPath();
            context.moveTo(coords[0], coords[1]);
            if (coords[2] && coords[3]) {
                context.lineTo(coords[2], coords[3]);
            }
            context.lineTo(x, y);
            context.closePath();
            context.stroke();
        }
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

function clearCanvas(keep = false) {
    if (!keep) {
        let confirmed = confirm("Atenção! Isso apagará todos os objetos.");
        if (!confirmed) {
            return;
        }
        shapesList = [];
        selectionList.innerHTML = `<li id="selection-list-title">Lista de Seleção</li>`
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function help(open = false) {
    if (open) {
        document.getElementById("help-box").classList.add("is-active");
    } else {
        document.getElementById("help-box").classList.remove("is-active");
    }
}

// createLine([23, 34, 160, 250]);
// createCircle([23, 120], 45);
// createRectangle([23, 54, 65, 87]);
// createTriangle([23, 43, 65, 76, 222, 111]);
// select(0);