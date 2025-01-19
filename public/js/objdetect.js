let model;
let webcam;
let canvas;
let ctx;
let startTime;
let mediaRecorder;
let recordedChunks = [];
let isRecording = false;

function updateLoadingTime() {
    const loading = document.querySelector('#loading');
    if (loading && !model) {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        loading.textContent = `Loading model... ${elapsed}s`;
        requestAnimationFrame(updateLoadingTime);
    }
}

async function init() {
    try {
        console.log('Initializing...');
        startTime = Date.now();
        
        // Initialize DOM elements
        webcam = document.querySelector('#webcam');
        canvas = document.querySelector('#canvas');
        const startButton = document.querySelector('#startButton');
        const stopButton = document.querySelector('#stopButton');
        const photoButton = document.querySelector('#photoButton');
        const recordButton = document.querySelector('#recordButton');
        const loading = document.querySelector('#loading');
        
        if (!webcam || !canvas || !startButton || !stopButton || !loading) {
            throw new Error('Required elements not found');
        }
        
        ctx = canvas.getContext('2d');
        
        // Load COCO-SSD model
        console.log('Loading COCO-SSD model...');
        updateLoadingTime();
        model = await cocoSsd.load(window.modelConfig);
        const loadTime = ((Date.now() - startTime) / 1000).toFixed(1);
        console.log(`Model loaded in ${loadTime}s`);
        loading.style.display = 'none';
        
        // Add event listeners
        startButton.addEventListener('click', startCamera);
        stopButton.addEventListener('click', stopCamera);
        photoButton.addEventListener('click', takePhoto);
        recordButton.addEventListener('click', toggleRecording);
        
        console.log('Initialization complete');
    } catch (err) {
        console.error('Init error:', err);
    }
}

async function detectFrame() {
    if (!webcam.srcObject) return;
    
    try {
        const predictions = await model.detect(webcam);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        predictions.forEach(prediction => {
            const [x, y, width, height] = prediction.bbox;
            
            // Draw box
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, width, height);
            
            // Draw label with confidence
            const label = `${prediction.class} ${Math.round(prediction.score * 100)}%`;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
            ctx.fillRect(x, y > 25 ? y - 25 : 0, 
                        ctx.measureText(label).width + 10, 25);
            
            ctx.fillStyle = '#00ff00';
            ctx.font = '16px Arial';
            ctx.fillText(label, x + 5, y > 25 ? y - 5 : 20);
        });
        
        requestAnimationFrame(detectFrame);
    } catch (err) {
        console.error('Detection error:', err);
    }
}

async function startCamera() {
    try {
        console.log('Starting camera...');
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 640 },
                height: { ideal: 480 }
            }
        });
        
        webcam.srcObject = stream;
        webcam.onloadedmetadata = () => {
            webcam.play();
            updateDimensions();
            document.querySelector('#startButton').style.display = 'none';
            document.querySelector('#stopButton').style.display = 'block';
            detectFrame();
        };
    } catch (err) {
        console.error('Camera error:', err);
    }
}

function updateDimensions() {
    const container = webcam.parentElement;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    webcam.style.width = `${containerWidth}px`;
    webcam.style.height = `${containerHeight}px`;
    canvas.width = containerWidth;
    canvas.height = containerHeight;
}

async function takePhoto() {
    if (!webcam.srcObject) return;
    
    const photo = document.createElement('canvas');
    photo.width = webcam.videoWidth;
    photo.height = webcam.videoHeight;
    photo.getContext('2d').drawImage(webcam, 0, 0);
    
    // Download photo
    const link = document.createElement('a');
    link.download = `photo-${Date.now()}.png`;
    link.href = photo.toDataURL();
    link.click();
}

function toggleRecording() {
    if (!webcam.srcObject) return;
    
    if (!isRecording) {
        startRecording();
    } else {
        stopRecording();
    }
}

function startRecording() {
    recordedChunks = [];
    const stream = webcam.srcObject;
    mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
            recordedChunks.push(e.data);
        }
    };
    
    mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `video-${Date.now()}.webm`;
        link.href = url;
        link.click();
    };
    
    mediaRecorder.start();
    isRecording = true;
    document.querySelector('#recordButton').textContent = 'Stop Recording';
}

function stopRecording() {
    mediaRecorder.stop();
    isRecording = false;
    document.querySelector('#recordButton').textContent = 'Start Recording';
}

function stopCamera() {
    if (webcam.srcObject) {
        const tracks = webcam.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        webcam.srcObject = null;
        
        // Clear canvas and reset UI
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.querySelector('#startButton').style.display = 'block';
        document.querySelector('#stopButton').style.display = 'none';
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        init().catch(err => console.error('Initialization failed:', err));
    });
} else {
    init().catch(err => console.error('Initialization failed:', err));
}