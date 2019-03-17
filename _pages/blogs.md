---
title:  "blog"
layout: archive
permalink: /blog/
author_profile: true
comments: true

excerpt: ""
header:
  overlay_image: /images/echo_g.png
  overlay_filter: 0.4 # same as adding an opacity of 0.5 to a black background
  caption: "Wavelet AMO Echo-G"
  actions:
---

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