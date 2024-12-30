---
title: "Real-time Object Detection"
date: 2024-04-06T13:30:00+02:00
lastmod: 2024-09-01T17:30:00
draft: false
author: "Matteo Totaro"
authorLink: "https://mtotaro.com/about"
description: "Real-time object detection using TensorFlow.js"
license: "©2024 Matteo Totaro"

# SEO
keywords: ["object detection", "tensorflow", "machine learning", "webcam"]
#tags: ["ml", "tensorflow", "javascript"]
#categories: ["Projects"]

# Performance
outputs: ["HTML", "AMP"]
featuredImagePreview: ""

# Layout
layout: objdetect
toc: false
lightgallery: false
linkToMarkdown: false
share:
  enable: false

# Custom Assets
customCSS: 
  - /css/objdetect.css
customJS:
  - https://cdn.jsdelivr.net/npm/@tensorflow/tfjs
  - https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd
  - /js/objdetect.js
---

{{< typeit tag=h3 >}}
Real-time Object Detection
{{< /typeit >}}

<div class="video-container">
    <video id="webcam" autoplay playsinline></video>
    <canvas id="canvas"></canvas>
</div>

<button id="startButton">Start Camera</button>
This is literally just for fun.
<button id="stopButton" style="display:none;">Stop Camera</button>