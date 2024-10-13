const video = document.getElementById('webcam');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
let stream;

async function setupWebcam() {
    return new Promise((resolve, reject) => {
        const constraints = {
            video: {
                facingMode: 'environment', // Usa la fotocamera posteriore sui dispositivi mobili
            }
        };

        navigator.mediaDevices.getUserMedia(constraints)
            .then(mediaStream => {
                stream = mediaStream;
                video.srcObject = stream;
                video.addEventListener('loadeddata', () => resolve(video));
            })
            .catch(err => reject(err));
    });
}

let model;

async function loadModel() {
    model = await cocoSsd.load();
    console.log('Model loaded');
}

const colors = {
    person: 'red',
    bicycle: 'blue',
    car: 'green',
    motorcycle: 'purple',
    airplane: 'cyan',
    bus: 'orange',
    train: 'yellow',
    truck: 'magenta',
    boat: 'lime',
    // Aggiungi altre classi di oggetti se necessario
    default: 'black'
};

async function detectObjects() {
    if (stream) {
        const predictions = await model.detect(video);
        renderPredictions(predictions);
        setTimeout(detectObjects, 100); // Rileva oggetti ogni 100ms
    }
}


function renderPredictions(predictions) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    predictions.forEach(prediction => {
        const [x, y, width, height] = prediction.bbox;
        const color = colors[prediction.class] || colors.default;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);
        ctx.font = '18px Arial';
        ctx.fillStyle = color;
        ctx.fillText(
            `${prediction.class} (${Math.round(prediction.score * 100)}%)`,
            x,
            y > 10 ? y - 5 : 10
        );
    });
}

startButton.addEventListener('click', () => {
    startButton.style.display = 'none'; // Nascondi il pulsante Start
    stopButton.style.display = 'inline'; // Mostra il pulsante Stop
    loadModel().then(() => {
        setupWebcam().then(() => {
            detectObjects();
        });
    });
});

stopButton.addEventListener('click', () => {
    stopButton.style.display = 'none'; // Nascondi il pulsante Stop
    startButton.style.display = 'inline'; // Mostra il pulsante Start

    // Interrompi lo stream e rilascia la fotocamera
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Pulisci il canvas
});
