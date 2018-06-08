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