---
id: formulation-bench
name: FormulationBench
date: 2026-08-21
logo:
    color: images/logos/formulation_bench_logo_color.png
    dark: images/logos/formulation_bench_logo_dark.png
sponsors: []
description: A dataset of MILP formulations and Lean reformulation proofs
github: https://github.com/henryrobbins/formulation-bench
website: https://formulation-bench.henryrobbins.com
---

Python utilities for loading and working with the [FormulationBench](https://formulation-bench.henryrobbins.com) dataset. FormulationBench is a collection
of 20 optimization problems with 109 mixed-integer linear programming (MILP)
formulations. Each formulation has a natural language description, LaTeX
formulation, GurobiPy implementation, and Lean representation. Furthermore,
there are 89 pairs of formulations consisting of 63 positive reformulation
examples and 26 negative examples. Each positive example has a machine-checked 
Lean 4 reformulation proof. See the [documentation](https://formulation-bench.henryrobbins.com) for details.

