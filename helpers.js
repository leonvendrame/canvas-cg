function resetStrokeColor() {
    context.strokeStyle = "black";
}

function switchSelection(index) {
    if (shapesList[index].selected) {
        unselect(index)
    } else {
        select(index);
    }
}

function select(index) {
    if (index >= shapesList.length) {
        console.log("Erro: Forma não presente na lista.");
        return;
    }
    var shapeObject = shapesList[index];
    if (shapeObject != undefined) {
        if (selectedShape != null) {
            unselect(shapesList.indexOf(selectedShape));
        }
        selectedShape = shapeObject;
        shapeObject.selected = true;
        clearCanvas(true);
        reDrawEverything();
        document.querySelector("#li-" + index).style.color = "red";
    }
}

function unselect(index) {
    if (index >= shapesList.length) {
        console.log("Erro: Forma não presente na lista.");
        return;
    }
    var shapeObject = shapesList[index];
    if (shapeObject != undefined) {
        shapeObject.selected = false;
        selectedShape = null;
        clearCanvas(true);
        reDrawEverything();
        document.querySelector("#li-" + index).style.removeProperty("color");
    }
}

function remove() {
    var index;
    var shapeObject = selectedShape;
    var tradeAuxiliar;

    if (!shapeObject) {
        alert("Erro: Selecione uma forma antes de deletar.");
        return;
    }

    index = shapesList.indexOf(shapeObject);

    unselect(index);
    shapesList.splice(index, 1);
    updateSelectList();

    clearCanvas(true);
    reDrawEverything();
}

function addSelectList(shapeObject) {
    const names = {"Circle": "Círculo", "Rectangle": "Retângulo", "Triangle": "Triângulo", "Line": "Linha"};
    const index = shapesList.indexOf(shapeObject);

    selectionList.innerHTML += `<li id="li-${index}" class="li-style" onclick="switchSelection(${index})">\
        ${index}. ${names[shapeObject.constructor.name]}</li>`
}

function updateSelectList() {
    for (var shape of shapesList) {
        removeSelectList(shape);
    }
    for (var shapeObject of shapesList) {
        addSelectList(shapeObject);
    }
    const element = document.getElementById(`li-${shapesList.length}`);
    element.parentNode.removeChild(element);
}

function removeSelectList(shapeObject) {
    const index = shapesList.indexOf(shapeObject);
    const element = document.getElementById(`li-${index}`);
    element.parentNode.removeChild(element);
}

function updatePoints(coordinates, shapeObject, radius = null) {
    switch (shapeObject.constructor.name) {
        case "Circle":
            shapeObject.points["center"]["x"] = coordinates.shift();
            shapeObject.points["center"]["y"] = coordinates.shift();
            shapeObject.radius = radius;
            break;
        case "Rectangle":
            shapeObject.points = {"origin": {"x": coordinates.shift(), "y": coordinates.shift()}};
            shapeObject.points["dest1"] = {"x": coordinates.shift(), "y": coordinates.shift()};
            shapeObject.points["dest2"] = {"x": coordinates.shift(), "y": coordinates.shift()};
            shapeObject.points["dest3"] = {"x": coordinates.shift(), "y": coordinates.shift()};
            break;
        case "Line":
            shapeObject.points = {"origin": {"x": coordinates.shift(), "y": coordinates.shift()}};
            shapeObject.points["dest"] = {"x": coordinates.shift(), "y": coordinates.shift()};
            break;
        case "Triangle":
            shapeObject.points = {"origin": {"x": coordinates.shift(), "y": coordinates.shift()}};
            shapeObject.points["dest1"] = {"x": coordinates.shift(), "y": coordinates.shift()};
            shapeObject.points["dest2"] = {"x": coordinates.shift(), "y": coordinates.shift()};
            break;
    }
}

function getClosestPoint() {

}

function capitalizeFirstLetter(string) {
    return string.replace(/^./, string[0].toUpperCase());
}

function callScale(secondClick, coordinates) {
    document.getElementById("scale-btn").classList.add("is-inverted");
    var selectedPoint = {"x": -1, "y": -1};
    var minDistance = 999999;
    if (!selectedShape) {
        alert("Erro: Selecione uma forma antes de aplicar a transformação");
        document.getElementById("scale-btn").classList.remove("is-inverted");
        return;
    }
    if (selectedShape.constructor.name == "Circle") {
        let newScale = prompt("Digite o valor que deseja escalar o raio.", "Ex.: 2");
        scale(newScale);
        document.getElementById("scale-btn").classList.remove("is-inverted");
    } else {
        if (!secondClick) {
            alert("Clique em um ponto próximo ao vértice o qual deseja aplicar a transformação.");
            return true;
        } else {
            // console.log(coordinates);
            let scaleVector = prompt("Digite o valor que deseja escalar em X e em Y separados por espaço.", "Ex.: 2 0.5");
            scaleVector = scaleVector.replace(/[a-z]/gi, "").trim();
            scaleVector = scaleVector.split(" ");

            for (var key of Object.keys(selectedShape.points)) {
                const distance = Math.abs(Math.hypot(coordinates[0]-selectedShape.points[key]["x"],
                                            coordinates[1]-selectedShape.points[key]["y"]));
                if (distance < minDistance) {
                    minDistance = distance;
                    selectedPoint["x"] = selectedShape.points[key]["x"];
                    selectedPoint["y"] = selectedShape.points[key]["y"];
                }
            }

            scale(scaleVector[0], scaleVector[1], selectedPoint["x"], selectedPoint["y"]);
            document.getElementById("scale-btn").classList.remove("is-inverted");
            globalOption = 0;
            return false;
        }
    }
}

function callRotation(secondClick, coordinates) {
    document.getElementById("rotation-btn").classList.add("is-inverted");
    var selectedPoint = {"x": -1, "y": -1};
    var minDistance = 999999;
    if (!selectedShape) {
        alert("Erro: Selecione uma forma antes de aplicar a transformação");
        document.getElementById("rotation-btn").classList.remove("is-inverted");
        return;
    }
    if (selectedShape.constructor.name == "Circle") {
        // let newScale = prompt("Digite o valor que deseja escalar o raio.", "Ex.: 2");
        // scale(newScale);
        document.getElementById("rotation-btn").classList.remove("is-inverted");
    } else {
        if (!secondClick) {
            alert("Clique em um ponto próximo ao vértice o qual deseja aplicar a transformação.");
            return true;
        } else {
            // console.log(coordinates);
            let rotationAngle = prompt("Digite o valor do ângulo em graus.", "Ex.: 90");
            rotationAngle = rotationAngle.replace(/[a-z]/gi, "").trim();
            rotationAngle = rotationAngle.split(" ");

            for (var key of Object.keys(selectedShape.points)) {
                const distance = Math.abs(Math.hypot(coordinates[0]-selectedShape.points[key]["x"],
                                            coordinates[1]-selectedShape.points[key]["y"]));
                if (distance < minDistance) {
                    minDistance = distance;
                    selectedPoint["x"] = selectedShape.points[key]["x"];
                    selectedPoint["y"] = selectedShape.points[key]["y"];
                }
            }

            rotate(rotationAngle, selectedPoint["x"], selectedPoint["y"]);
            document.getElementById("rotation-btn").classList.remove("is-inverted");
            globalOption = 0;
            return false;
        }
    }
}

function callTranslation() {
    if (!selectedShape) {
        alert("Erro: Selecione uma forma antes de aplicar a transformação");
        document.getElementById("translation-btn").classList.remove("is-inverted");
        return;
    } else {
        let translationVector = prompt("Digite o valor que deseja transladar em X e Y separados\
                                        por espaço.", "Ex.: 90 20");
        translationVector = translationVector.replace(/[a-z]/gi, "").trim();
        translationVector = translationVector.split(" ");

        translate(translationVector[0], translationVector[1]);
        document.getElementById("translation-btn").classList.remove("is-inverted");
        globalOption = 0;
    }
}

