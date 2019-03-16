---
title:  "Blog"
layout: archive
permalink: /Blogs/
author_profile: true
comments: true

excerpt: ""
header:
  overlay_image: /images/echo_g.png
  overlay_filter: 0.4 # same as adding an opacity of 0.5 to a black background
  caption: "Wavelet AMO Echo-G"
  actions:
---

This is my blog page.

{% for post in site.posts %}
  <article>
    <h2>
      <a href="{{ post.url }}">
        {{ post.title }}
      </a>
    </h2>
    <time datetime="{{ post.date | date: "%Y-%m-%d" }}">{{ post.date | date_to_long_string }}</time>
    {{ post.content }}
  </article>
{% endfor %}