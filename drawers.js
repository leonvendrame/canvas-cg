function drawCircle(circle) {
    context.beginPath();
    context.arc(circle.points["center"]["x"], circle.points["center"]["y"], circle.radius, 0, 2 * Math.PI);
    if (circle.selected) {
        context.strokeStyle = "red"
    }
    context.stroke();
    context.closePath();
    resetStrokeColor();
}

function drawTriangle(triangle) {
    context.beginPath();
    context.moveTo(triangle.points["origin"]["x"], triangle.points["origin"]["y"]);
    context.lineTo(triangle.points["dest1"]["x"], triangle.points["dest1"]["y"]);
    context.moveTo(triangle.points["dest1"]["x"], triangle.points["dest1"]["y"]);
    context.lineTo(triangle.points["dest2"]["x"], triangle.points["dest2"]["y"]);
    context.moveTo(triangle.points["dest2"]["x"], triangle.points["dest2"]["y"]);
    context.lineTo(triangle.points["origin"]["x"], triangle.points["origin"]["y"]);
    if (triangle.selected) {
        context.strokeStyle = "red"
    }
    context.stroke();
    context.closePath();
    resetStrokeColor();
}

function drawLine(line) {
    context.beginPath();
    context.moveTo(line.points["origin"]["x"], line.points["origin"]["y"]);
    context.lineTo(line.points["dest"]["x"], line.points["dest"]["y"]);
    if (line.selected) {
        context.strokeStyle = "red"
    }
    context.stroke();
    context.closePath();
    resetStrokeColor();
}

function drawRectangle(rectangle) {
    context.beginPath();
    context.moveTo(rectangle.points["origin"]["x"], rectangle.points["origin"]["y"]);
    context.lineTo(rectangle.points["dest1"]["x"], rectangle.points["dest1"]["y"]);
    context.moveTo(rectangle.points["dest1"]["x"], rectangle.points["dest1"]["y"]);
    context.lineTo(rectangle.points["dest2"]["x"], rectangle.points["dest2"]["y"]);
    context.moveTo(rectangle.points["dest2"]["x"], rectangle.points["dest2"]["y"]);
    context.lineTo(rectangle.points["dest3"]["x"], rectangle.points["dest3"]["y"]);
    context.moveTo(rectangle.points["dest3"]["x"], rectangle.points["dest3"]["y"]);
    context.lineTo(rectangle.points["origin"]["x"], rectangle.points["origin"]["y"]);
    if (rectangle.selected) {
        context.strokeStyle = "red"
    }
    context.stroke();
    context.closePath();
    resetStrokeColor();
}