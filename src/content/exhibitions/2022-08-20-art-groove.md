---
id: art-groove
name: Art Groove
year: 2022
location: Bowery Art Room. New York, NY
featured: ["weave"]
images: /images/art_groove
---
# Art Groove (2022)

The Art Groove August 20th was a group exhibition featuring nearly 40 artists.
The event was curated by [Shelby Jaquez](https://www.cottonisdead.com),
[Selfdestrct](https://selfdestrct.com),
[Richard Linares](https://www.instagram.com/itsrickasso/), and
[Alina Tejada](https://www.instagram.com/cocalina11/). This marked the third
exhibition curated by the group with previous exhibitions on October 23rd, 2021
and December 4th, 2021.

<img src="{{ page.images }}/flyer_date.jpeg" width="300"/>
<img src="{{ page.images }}/flyer_artists.jpeg" width="300"/>

## Featured Work

{% for feature in page.featured %}
{%- assign w = site.artworks | where:"title", feature | first -%}
- {{ w.artist }}. *[{{ w.title }}]({{ w.url }})* ({{ w.date | date : "%Y" }})
{% endfor %}

## Images

<img src="{{ page.images }}/prints.jpeg"/>
