---
title: "Object Detection"
date: 2024-04-06T13:30:00+02:00
lastmod: 2024-09-01T17:30:00
draft: false

authorLink: "https://mtotaro.com/about"
description: ""
license: "©2024 Matteo Totaro"

tags:
categories:
hiddenFromHomePage: false

featuredImage: ""
featuredImagePreview: ""

lightgallery: true
linkToMarkdown: false
share:
  enable: false
---

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
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
