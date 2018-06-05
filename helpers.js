function resetStrokeColor() {
    context.strokeStyle = "black";
}

function flip(abssys) {
    if (abssys.toString().toLowerCase() == 'x') {
        context.translate(canvas.width / 2, canvas.height / 2);
        context.scale(-1, 1);
        console.log("ALOJA");
        // clearCanvas();
        reDrawEverything([-1, 1]);
    } else {
        context.scale(1, -1);
    }
}

// if ((abssys.toString().toLowerCase() == 'y')) {