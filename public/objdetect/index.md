# Post con script JS

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Post con script JS - Matteo Totaro</title>
    <!-- Include CSS -->
    <link rel="stylesheet" href="/css/objdetect.css">
    <!-- Include JavaScript Libraries -->
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd"></script>
</head>
<body>
    <h1>Real-time Object Detection</h1>
    <div class="video-container">
        <video id="webcam" autoplay playsinline></video>
        <canvas id="canvas"></canvas>
    </div>
    <button id="startButton">Start Camera</button>
    <button id="stopButton" style="display:none;">Stop Camera</button>
    <!-- Include Custom JavaScript -->
    <script src="/js/objdetect.js"></script>
</body>
</html>

