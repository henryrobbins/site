---
layout: artwork
artist: Henry Robbins
title: dissolve
date: 2021-03-02
medium: Netpbm (P2)
link: https://github.com/henryrobbins/art-3699/tree/master/netpbm/dissolve
images: [art/netpbm/dissolve/dissolve.png, art/netpbm/dissolve/dissolve2.png, art/netpbm/dissolve/dissolve3.png, art/netpbm/dissolve/beebe_trail_h70.png, art/netpbm/dissolve/beebe_trail_h100.png, art/netpbm/dissolve/beebe_trail_h140.png, art/netpbm/dissolve/beebe_trail_v80.png, art/netpbm/dissolve/beebe_trail_h60v47.png, art/netpbm/dissolve/beebe_trail_h71v251.png]
videos: []
---

This series contains two groups of images: those that were hand-crafted and
those that were created by a script. dissolve.pgm, dissolve2.pgm, and
dissolve3.pgm were hand-crafted (2021-02-26). The beebe_trail subseries is
generated via a script (2021-03-02). Both are based on the same principle:
dissolving a vector of pixels. A plan was chosen to iteratively update a vector
of pixels until all pixels are black. The three hand-crafted images begin with
different lengths of a random vector. The columns from the left to the right of
the image show how the vector is updated until it dissolves completely. For the
beebe_trail subseries, this same plan was implemented programatically. A vector
(some row in the case of 'h' and column in the case of 'w') at location i is
chosen from the image to dissolve. In some images, consecutive dissolves are
applied. For example, beebe_trail_h60v47 is acheived by first dissolving down
from row 60 and then dissolving to the left from column 47.

