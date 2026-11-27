---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
# draft: true = not published. Change to false when the post is ready.
draft: true
# Shown under the title as "Month 'YY - <place>"
place: "City, Country"
# One sentence, used by search engines and link previews
description: ""
# Optional captions: one line per photo, "file name: text"
# captions:
#   01.jpg: "Caption of the first photo"
---

Write a few lines here (optional). The photos you put in this folder are
shown below automatically, in file-name order: name them 01.jpg, 02.jpg, ...
