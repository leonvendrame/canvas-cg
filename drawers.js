function drawCircle(circle) {
    context.beginPath();
    context.arc(circle.center['x'], circle.center['y'], circle.radius, 0, 2 * Math.PI);
    if (circle.selected) {
        context.strokeStyle = "red"
    }
    context.stroke();
    context.closePath();
    resetStrokeColor();
}

function drawTriangle(triangle) {
    context.beginPath();
    context.moveTo(triangle.origin['x'], triangle.origin['y']);
    context.lineTo(triangle.dest1['x'], triangle.dest1['y']);
    context.moveTo(triangle.dest1['x'], triangle.dest1['y']);
    context.lineTo(triangle.dest2['x'], triangle.dest2['y']);
    context.moveTo(triangle.dest2['x'], triangle.dest2['y']);
    context.lineTo(triangle.origin['x'], triangle.origin['y']);
    if (triangle.selected) {
        context.strokeStyle = "red"
    }
    context.stroke();
    context.closePath();
    resetStrokeColor();
}

function drawLine(line) {
    context.beginPath();
    context.moveTo(line.origin['x'], line.origin['y']);
    context.lineTo(line.dest['x'], line.dest['y']);
    if (line.selected) {
        context.strokeStyle = "red"
    }
    context.stroke();
    context.closePath();
    resetStrokeColor();
}

function drawRectangle(rectangle) {
    context.beginPath();
    context.moveTo(rectangle.origin['x'], rectangle.origin['y']);
    context.lineTo(rectangle.dest['x'], rectangle.origin['y']);
    context.moveTo(rectangle.dest['x'], rectangle.origin['y']);
    context.lineTo(rectangle.dest['x'], rectangle.dest['y']);
    context.moveTo(rectangle.dest['x'], rectangle.dest['y']);
    context.lineTo(rectangle.origin['x'], rectangle.dest['y']);
    context.moveTo(rectangle.origin['x'], rectangle.dest['y']);
    context.lineTo(rectangle.origin['x'], rectangle.origin['y']);
    if (rectangle.selected) {
        context.strokeStyle = "red"
    }
    context.stroke();
    context.closePath();
    resetStrokeColor();
}