---
id: graph-builder
name: Graph Builder
date: 2016-09-01
logo:
    color: images/logos/graph_builder_logo_color.png
    dark: images/logos/graph_builder_logo_dark.png
sponsors: []
description: A Java program for constructing and analyzing graphs
github: https://github.com/henryrobbins/graph-builder
---

Graph Builder is a Java program for constructing [graphs][graph]. It
currently supports undirected, directed, and structural graphs. Additionally,
the "Grid Graph" selection allows for creating graphs where node positions
are locked on to a grid. The following graph statistics are maintained as
the graph is constructed.

- Node count (`int`)
- Edge count (`int`)
- [Connected][connected] (`bool`)
- Smallest and largest [degree][degree] (`int`)
- Average degree (`float`)
- Smallest and largest [geodesic][geodesic] (`int`)
- Average geodesic (`float`)

Additionally, the list of each node's [neighbors][neighbor] is maintained.

[connected]: https://en.wikipedia.org/wiki/Connectivity_(graph_theory)
[degree]: https://en.wikipedia.org/wiki/Degree_(graph_theory)
[geodesic]: https://en.wikipedia.org/wiki/Distance_(graph_theory)
[neighbor]: https://en.wikipedia.org/wiki/Neighbourhood_(graph_theory)
[graph]: https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)
