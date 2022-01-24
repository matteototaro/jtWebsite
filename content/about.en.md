---
title: "About Me"
date: 2020-04-13T22:25:49+02:00
lastmod: 2020-10-18T15:30:00+02:00
draft: false
author: "Matteo"
authorLink: "https://mtotaro.com/about"
description: ""
license: "©2021 Matteo Totaro"

tags: 
hiddenFromHomePage: true

featuredImage: ""
featuredImagePreview: ""

lightgallery: false
linkToMarkdown: false
share:
  enable: true
---

<meta property="og:type" content="website" /> 
<meta name="author" content="{{ .Site.Params.author }}" />
<script defer type="application/ld+json">
  { 
    "@context": "http://schema.org", 
    "@type": "WebSite", 
    "url": "{{ .Permalink }}", 
    "sameAs": [
      "{{ .Site.Params.facebook }}", 
      "{{ .Site.Params.github }}"
    ], 
    "name": "{{ .Title }}", 
    "logo": "https://www.example.com/images/brand/favicon.png" 
  }
</script>

<meta name="robots" content="index,follow" /> 
<meta name="googlebot" content="index,follow" />
<meta name="twitter:site" content="{{ .Site.Params.twitter }}">
<meta name="twitter:creator" content="{{ .Site.Params.twitter }}" />
<style>
p {
  max-width: auto;
  margin: auto;
  text-align:justify;
}
.column {
  float: left;
  width: 33.33%;
  text-align: center;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}
.column2 {
  float: right;
  width: 50%;
  text-align: center;
}
.single .content code { font-size: 11px; color: grey; } /*light theme by default*/
[theme="dark"] .single .content code { font-size: 11px; color: #c2a97a ; background: #313233; }
 mark {
  background-color: #3aafdbd4;
  color: black;
}
[theme="dark"] ::selection mark {
  background-color: #55bde2;
  color: black;
}
</style>

<div class="container-fluid">
    <div class="col-md-8 col-md-push-2 no-padding-left" >
        {{< typeit >}} My name is Matteo Totaro, I'm 23 and I'm from Reggio Emilia, Italy. {{< /typeit >}}
        <br>
        <p><strong>I love photography</strong>, in fact this website was built to create a personal angle in the vast web to public parts of my albums in order to give them more glory and credit. Also I wanted to save them from the conversion-alghoritms of social media. Recently I got a bachelor degree in Electronic Engineering acquired in Modena. Shortly after, I built this website almost from scratch in order to learn more about other programming languages like HTML and CSS in an alternative way.<br><br>
        <strong>This static site</strong> has been built in a month more or less with the open source framework
        <a href="https://gohugo.io/">Hugo</a> during april 2020, when the entire world was quarantined at home.<br>So I took this time to focus on personal projects exactly like this one you're reading.<br>
        The site is hosted on <a href="https://www.netlify.com/">Netlify</a>, which takes all the files from a public repository on Github.
        The main goal of this space is to publish my previous and future projects so the pictures will be put up just like they are, with the purpose to create a sort of <i>personal museum</i> to observe the evolutionary process over time.</p>
        <figure style="max-width:100%;height:auto;display:inline;">
            <img class="lazyload blur-up" src="/images/selfie.jpg" style="width:100%;height:auto;">
            <figcaption><code>Selfie in a beach-house near the county of<br>Cardiff, Wales (11/2016)</code></figcaption>
          </figure>
        <br><p>At the moment I'm studying Advanced Automotive Electronic Engineering (<a href="https://motorvehicleuniversity.com/"  target="_blank">AAEE</a>) at the University of Bologna.<br>I have a Nikon D5300 with a super boring 18-55mm, eventually I'll buy more lenses.
        I tried to find a compromise between photo quality and loading speed of the website, I hope you enjoy it.<br>
        Thanks for stopping by and have a great day!</p><br>
        <p style="font-size:85%;text-align:right;">Last page update: 18th November 2020</p><br>
      </div>
  <div class="row" style="text-align:center;">
    <div class="column" style="text-align:right;">
      <h4><mark>Contacts:</mark></h4>
    </div>
    <div class="column">
       <h5><a href="mailto:tmatteos@gmail.com" target="_blank"> Mail</a></h5>
    </div>
    <div class="column" style="text-align:left;">
      <h5><a href="https://it.linkedin.com/in/m-totaro" target="_blank">Linkedin</a></h5>
    </div>
   </div>
</div>