---
layout: default
title: Art
tab: true
permalink: /art
---

## Exhibitions

{% for e in site.exhibitions reversed %}
- ({{ e.year }}) [{{ e.name }}]({{ e.url }}). {{ e.location }} {% endfor %}

## Archive

A complete archive of work can be found [here](/art/archive).
