---
title: "About Me"
date: 2020-04-13T22:25:49+02:00
lastmod: 2024-08-26T17:30:00
draft: false

authorLink: "https://mtotaro.com/about"
description: ""
license: "©2024 Matteo Totaro"

tags: 
hiddenFromHomePage: true

featuredImage: ""
featuredImagePreview: ""

lightgallery: false
linkToMarkdown: false
share:
  enable: false
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
        {{< typeit >}} My name is Matteo Totaro, I'm 27 and I'm from Reggio Emilia, Italy. {{< /typeit >}}
        <p><strong>I like photography</strong>, so  this website was built to create a personal space in the web to post parts of my albums, to give them more glory and credit. Also I wanted to save them from the conversion-alghoritms of social media.
        <br><br>
        <strong>This is a static site</strong>built in less than a month with the open source framework <a href="https://gohugo.io/">Hugo</a> during april 2020, when the entire world was quarantined at home, so I took this time to focus on personal projects exactly like this one you're reading.
        <br>
        The main goal of this space is to publish my previous and future projects just like they are, with the purpose to create a sort of <i>personal museum</i> to observe the evolutionary process over time.<br><br>
        I tried to find a compromise between photo quality and loading speed of the website. Hope you like it.<br>
        Thanks for stopping by and have a great day.<br>
        </p>
        <figure style="max-width:100%;height:auto;display:inline;">
            <img class="lazyload blur-up" src="/images/selfie.jpg" style="width:100%;height:auto;">
            <br><figcaption><code>Selfie in a beach-house near the county of<br>Cardiff, Wales (11/2016)</code></figcaption>
          </figure>
        <p style="font-size:85%;text-align:right;">Last page update: 13th October 2024</p><br>
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