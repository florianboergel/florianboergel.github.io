---
title: "Welcome"
layout: splash
permalink: /
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /images/echo_g.png
  actions:
    - label: "Download code"
      url: "https://github.com/florianboergel"
  caption: "Wavelet AMO Echo-G"
excerpt: ""
intro: 
  - excerpt: 'On my website you will find python code, climate science and sometimes me talking politics.'
feature_row:
  - image_path: /images/code.png
    alt: "placeholder image 1"
    title: "How to code for climate research?"
    excerpt: "In the future there we will be some content about EOFs and wavelet anaylsis using python"
    url: /code/
    btn_label: "Read More"
    btn_class: "btn--primary"
  - image_path: /images/Florian_Boergel.jpg
    image_caption: "(c) Grüne Rostock"
    alt: "placeholder image 2"
    title: "Election in Rostock"
    excerpt: "On 26th of May we will vote on the local parliament in Rostock and I run for election"
    url: /buergerschaft/
    btn_label: "Read More"
    btn_class: "btn--primary"
  - image_path: /images/amo.jpg
    image_caption: "(c) NASA worldview"
    title: "My first publication in Geophysical Research Letters"
    excerpt: "The impact of Atlantic Multidecal Oscillation on Baltic Sea Variability"
    url: /publications/
    btn_label: "Read More"
    btn_class: "btn--primary"
---

{% include feature_row id="intro" type="center" %}

{% include feature_row %}
