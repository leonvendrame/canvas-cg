function resetStrokeColor() {
    context.strokeStyle = "black";
}

// function flip(abssys) {
//     if (abssys.toString().toLowerCase() == 'x') {
//         context.translate(canvas.width / 2, canvas.height / 2);
//         context.scale(-1, 1);
//         console.log("ALOJA");
//         // clearCanvas();
//         reDrawEverything([-1, 1]);
//     } else {
//         context.scale(1, -1);
//     }
// }

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

    if (!selectedShape) {
        alert("Erro: Selecione uma forma antes de deletar.");
    }

    index = shapesList.indexOf(shapeObject);

    shapesList.splice(index, 1);

    selectedShape = null;

    clearCanvas(true);
    reDrawEverything();
}