
const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');
const resetBtn = document.getElementById('Btn');
const status = document.getElementById('message');

let circles = [];
let isDrawing = false;
let startX = 0;
let startY = 0;

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        const currentX = e.offsetX;
        const currentY = e.offsetY;
        const radius = Math.hypot(currentX - startX, currentY - startY) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawAllCircles();
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.fillStyle = getRandomColor();
        ctx.fill();
        ctx.closePath();
    }
});

canvas.addEventListener('mouseup', (e) => {
    if (isDrawing) {
        isDrawing = false;
        const radius = Math.hypot(e.offsetX - startX, e.offsetY - startY) / 2;
        const color = ctx.fillStyle;
        const circle = {
            x: startX,
            y: startY,
            radius: radius,
            color: color
        };
        circles.push(circle);
    }
});



canvas.addEventListener('dblclick', (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        const dist = Math.hypot(circle.x - x, circle.y - y);
        if (dist <= circle.radius) {
            circles.splice(i, 1);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawAllCircles();
            break;
        }
    }
});

function drawAllCircles() {
    for (const circle of circles) {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = circle.color;
        ctx.fill();
        ctx.closePath();
    }
}

resetBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles = [];
    statusDiv.innerText = 'Status: ';
});


document.addEventListener('click', (e) => {
    const canvasRect = canvas.getBoundingClientRect();
    const isInsideCanvas = (
        e.clientX >= canvasRect.left &&
        e.clientX <= canvasRect.right &&
        e.clientY >= canvasRect.top &&
        e.clientY <= canvasRect.bottom
    );

    if (isInsideCanvas) {
        const x = e.clientX - canvasRect.left;
        const y = e.clientY - canvasRect.top;
        let hit = false;

        for (const circle of circles) {
            const dist = Math.hypot(circle.x - x, circle.y - y);
            if (dist <= circle.radius) {
                hit = true;
                break;
            }
        }

        status.innerText = `Status: ${hit ? 'Hit' : 'Miss'}`;
    }
});