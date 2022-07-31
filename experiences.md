---
layout: default
title: Experience
tab: true
permalink: /experiences/
---

# Experience
---
{% for e in site.experiences reversed %}
**{{ e.name }}**, {{e.company }}, *{{ e.role }}* \\
*{{ e.start | date: "%b. %Y" }} - {{ e.end | date: "%b. %Y" }}* \\
[About]({{ e.url }}) |  [GitHub]({{ e.github_link }}) \\
{{ e.content | strip_html | truncate : 250}}

---
{% endfor %}
