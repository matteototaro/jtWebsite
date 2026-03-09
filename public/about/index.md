# About Me


<div class="container-fluid">
    <div class="col-md-8 col-md-push-2 no-padding-left" >
        <p>{{< typeit >}} I am Matteo, I'm 28 and I live in Reggio Emilia, Italy. {{< /typeit >}}<br>
        I am curious and creative engineer. I work in Ferrari as an Electronics Test Engineer on high voltage components for the next Hybrid and Full-Electric Ferrari. I built this website as a repository for my personal photos both digital and analog, but lately I wanted to share more about a few projects I have in mind. <br>Let's see how it goes.<br><br>
        Thanks for stopping by and have a great day!
        </p>
        <figure style="max-width:100%;height:auto;display:inline;">
            <img class="lazyload blur-up" src="/images/selfie.jpg" style="width:100%;height:auto;">
            <br><figcaption><code>Selfie in a beach-house near the county of<br>Cardiff, Wales (11/2016)</code></figcaption>
          </figure>
        <p style="font-size:85%;text-align:right;">Last page update: February 2026</p><br>
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

