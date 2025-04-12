---
title: "Master's Project"
date: 2024-10-17T10:00:00+02:00
lastmod: 2024-10-17T23:30:00+02:00
draft: true

authorLink: "https://mtotaro.com/about"
description: ""
license: "©2024 Matteo Totaro"

tags:
categories:
hiddenFromHomePage: false

featuredImage: ""
featuredImagePreview: ""

lightgallery: false
linkToMarkdown: false
share:
  enable: false
---


My Master's Thesis was a MATLAB model that had the goal to convert any racetrack profile into a countable cycle needed to estimate the lifetime of the Electronics inside of an Hybrid/Electric Ferrari. More in detail, the focus was onto the Power Module inside of the traction inverter. 
Power Module inside.

Given the electrical characteristics of the system and the racetrack profile (in terms of Inverter data") it is possible to calculate the total Power Loss of the system.
From that, having in mind the Thermal Network of our Power Module we can estimate the temperature of the junction of the module; this can be achieved thanks to the analogy between Electrical and Thermal.

Once we have the Temperature of the junction we can calculate with the Rainflow Alorithm the stress caused by the continuous increase/decrease of the temperature: in electronics this is the real bad thing.
So the algorithm will count how many (N) variations in temperature (Delta_T) and for how long they last (Delta_t).

tags: Thermal Network, Rainflow Algorithm.

<i>Matteo</i>
</p>