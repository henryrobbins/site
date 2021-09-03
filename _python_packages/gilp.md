---
layout: default
name: gilp
description: A Python package for visualizing the geometry of linear programs
github: https://github.com/henryrobbins/gilp
docs: https://gilp.henryrobbins.com
badges: [
    https://img.shields.io/pypi/pyversions/gilp.svg,
    https://circleci.com/gh/henryrobbins/gilp.svg?style=shield&circle-token=23cdbbfe0a606bd908e1a2a92bdff6f66d3e1c54,
    https://readthedocs.org/projects/gilp/badge/?version=latest,
    https://codecov.io/gh/henryrobbins/gilp/branch/master/graphs/badge.svg
]
---
GILP (Geometric Interpretation of Linear Programs) is a Python package for
visualizing the geometry of:

- [Linear Programs](https://en.wikipedia.org/wiki/Linear_programming) (LPs)
- [The Simplex Algorithm](https://en.wikipedia.org/wiki/Simplex_algorithm)
- [The Branch and Bound Algorithm](https://en.wikipedia.org/wiki/Branch_and_bound)

LPs can be constructed from NumPy arrays and many examples
(such as the [Klee-Minty cube](https://en.wikipedia.org/wiki/Klee%E2%80%93Minty_cube))
are included. The revised simplex method is implemented along with phase I for finding
an initial feasible solution. The package relies on [Plotly](https://plotly.com/python/)
to generate standalone HTML files which can be viewed in a Jupyter Notebook
inline or in a web browser.