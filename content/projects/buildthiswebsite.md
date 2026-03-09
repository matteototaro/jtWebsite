---
title: "How I built this"
date: 2020-04-13T22:25:49+02:00
lastmod: 2024-02-15T17:30:00
draft: false

authorLink: "https://mtotaro.com/about"
description: ""
license: "©2026 Matteo Totaro"

tags: 
hiddenFromHomePage: true

featuredImage: ""
featuredImagePreview: ""

lightgallery: false
linkToMarkdown: false
share:
  enable: false
---

This site is a personal static website built with the Hugo framework. I created the content as Markdown files and added a few personal CSS files on top of the LoveIt theme to customize the appearance.

How it works (reordered):

1. Authoring: I write content in Markdown and add images and small CSS overrides alongside the LoveIt theme.
2. Local preview: I run Hugo locally with `hugo server -D` to generate the site and preview changes with live reload.
3. Version control: changes are committed with Git and pushed to a public GitHub repository.
4. Continuous deployment: Netlify watches the repository, builds the static site, and deploys it to the configured domain.
5. Production: the site is served from Netlify and connected to a custom domain that I purchased.

The main goal of this project is to publish my previous and future works in a space I control — a small personal "museum" to track my evolution over time. I created the site in April 2020 using Hugo and the LoveIt theme.

Reference video that inspired the choice of Hugo: [Riccardo Palombo's Hugo introduction](https://youtu.be/O_IViNjCApU?si=qba6GNgWx0X-9wQB)

Simple diagram (authoring → deploy):

```
  A[Write Markdown & add CSS] --> B[hugo server (local preview)]
  A --> C[GitHub (push repo)]
  C --> D[Netlify builds & deploys]
  D --> E[Custom domain]
  B --> D
```

I tried to balance photo quality with page loading performance. Hope you like it!