let xArray = [];
let yArray = [];
let xArray_vec = [];
let yArray_vec = [];
let originalXArray = [], originalYArray = [], originalXVec = [], originalYVec = [];
let animationId = null; 

function myFunction() {
    let num_points = parseInt(document.getElementById("numb").value, 10);
    
    if (isNaN(num_points) || num_points < 1 || num_points > 10) {
        document.getElementById("demo").innerHTML = "Input not valid";
        return;
    } else {
        document.getElementById("demo").innerHTML = "Input OK";
    }

    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, -1, 0, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    xArray = [];
    yArray = [];
    xArray_vec = [];
    yArray_vec = [];

    let vectorLength = 20;

    for (let j = 0; j < num_points; j++) {
        let x_start = Math.random() * canvas.width;
        let y_start = Math.random() * canvas.height;
        
        let angle = Math.random() * 2 * Math.PI;
        let x_vec = Math.cos(angle) * vectorLength;
        let y_vec = Math.sin(angle) * vectorLength;

        xArray.push(x_start);
        yArray.push(y_start);
        xArray_vec.push(x_vec);
        yArray_vec.push(y_vec);
    }

    drawPointAndVec();
    // shallow copy of arrays
    originalXArray = [...xArray];
    originalYArray = [...yArray];
    originalXVec = [...xArray_vec];
    originalYVec = [...yArray_vec];
}

function drawPointAndVec() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    for (let i = 0; i < xArray.length; i++) {
        const x = xArray[i];
        const y = yArray[i];
        
        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.ellipse(x, y, 30, 15, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Tail
        ctx.beginPath();
        ctx.moveTo(x - 30, y);
        ctx.lineTo(x - 50, y - 15);
        ctx.lineTo(x - 50, y + 15);
        ctx.closePath();
        ctx.fillStyle = "orange";
        ctx.fill();
        ctx.stroke();

        // Eye
        ctx.beginPath();
        ctx.arc(x + 15, y - 5, 3, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.stroke();

        // Pupil
        ctx.beginPath();
        ctx.arc(x + 15, y - 5, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
    }
}



// function drawArrowhead(ctx, x, y, angle) {
//     let arrowSize = 6;
//     ctx.beginPath();
//     ctx.moveTo(x, y);
//     ctx.lineTo(
//         x - arrowSize * Math.cos(angle - Math.PI / 6),
//         y - arrowSize * Math.sin(angle - Math.PI / 6)
//     );
//     ctx.lineTo(
//         x - arrowSize * Math.cos(angle + Math.PI / 6),
//         y - arrowSize * Math.sin(angle + Math.PI / 6)
//     );
//     ctx.closePath();
//     ctx.fillStyle = "blue";
//     ctx.fill();
// }

function myMove() {
    let speed = document.getElementById("speedSelect").value;
    let step;

    if (speed === "slow") step = 0.2;
    else if (speed === "medium") step = 0.7;
    else if (speed === "fast") step = 1.5;


    animationId = setInterval(() => {
        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");
        ctx.setTransform(1, 0, 0, -1, 0, canvas.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < xArray.length; i++) {
            xArray[i] += xArray_vec[i] * step;
            yArray[i] += yArray_vec[i] * step;

            if (xArray[i] >= canvas.width || xArray[i] <= 0) xArray_vec[i] *= -1;
            if (yArray[i] >= canvas.height || yArray[i] <= 0) yArray_vec[i] *= -1;
        }

        drawPointAndVec();
    }, 50);
}



function reset() {
    if (animationId) clearInterval(animationId);

    xArray = [...originalXArray];
    yArray = [...originalYArray];
    xArray_vec = [...originalXVec];
    yArray_vec = [...originalYVec];

    drawPointAndVec();        
}
function posTracking() {
    const keepTrace = document.getElementById("traceCheckbox").checked;
    let outputDiv = document.getElementById("positionOutput");

    if (keepTrace) {
        outputDiv.innerHTML = "<strong>Positions:</strong><br>"; // Clear previous content
        
        for (let i = 0; i < xArray.length; i++) {
            outputDiv.innerHTML += `Point ${i + 1} Now: (${xArray[i].toFixed(2)}, ${yArray[i].toFixed(2)})<br>`;
            outputDiv.innerHTML += `Point ${i + 1} Original: (${originalXArray[i].toFixed(2)}, ${originalYArray[i].toFixed(2)})<br>`;
        }
    } else {
        outputDiv.innerHTML = ""; // Clear output when trace is disabled
    }
}
