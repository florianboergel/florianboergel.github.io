---
title:  "about"
layout: archive
permalink: /code/
author_profile: true
comments: false
---

Below you will find the lecture material for the class **Climate of the Ocean** and some software.

# Climate of the Ocean 

In this class you will get an introduction to fundamental processes of the climate system. 

All exercise and tutorials can be accessed at [florianboergel.github.io/climateoftheocean](https://florianboergel.github.io/climateoftheocean/). To make this accessible for everyone, we are using a jupyter book and every interactive lecture can be started using Binder.

## Lecture content
- Fundamental processes of the climate system (greenhouse effect, radiation balance, climate sensitivity, stability and feedbacks)
- Basic methods of the analysis and modeling of the climate system with focus on the ocean
- Equations of motion of the large-scale circulation with focus on the ocean
- Coupled atmosphere–ocean–sea-ice models
- Spatial and temporal variability of the climate system
- Anthropogenic climate change and natural climate variability (externally and internally driven climate variability)


# Software

## pyTEF

> pyTEF is a Python package that can be used to apply the Total Exchange (TEF) analysis framework to analyze the exchange flow of an estuary.

To do so TEF analyzes the exchange flow in salinity and/or temperature coordinates rather than spatial coordinates. This package provides the necessary tools to use the TEF framework and is built on top of xarray.

For more see: [pyTEF on github](https://github.com/florianboergel/pyTEF)

### Installing

To install use

`git clone https://github.com/florianboergel/pyTEF.git` and then 

`pip install -e pyTEF`

### Learn about TEF

The TEF analysis framework (MacCready, 2011; Lorenz et al., 2019) allows a consistent calculation of the transports and salinities of an exchange flow in salinity space (or every other coordinate). The main idea of TEF is that transports of volume and salinity in and out the estuary of the same salinity partially compensate since only the net exchange changes salinity and volume of the estuary.

The reader is referenced to the following literature:

- [PhD thesis of Marvin Lorenz](http://rosdok.uni-rostock.de/resolve/id/rosdok_disshab_0000002489?_search=89c68482-f7cc-4363-89af-58ddebb819c2&_hit=0)

- MacCready, P., 2011: Calculating estuarine exchange flow using isohaline coordinates. Journal of Physical Oceanography, 41 (6), 1116–1124.

- Lorenz, M., Klingbeil, K., MacCready, P., and Burchard, H. (2019) Numerical issues of the Total Exchange Flow (TEF) analysis framework for quantifying estuarine circulation, Ocean Sci., 15, 601-614, https://doi.org/10.5194/os-15-601-2019

- Lorenz, M., Klingbeil, K., and Burchard, H. (2020) Numerical Study of the Persian Gulf using an Extended Total Exchange Flow Analysis Framework, J. Geophys. Res. Oceans, 125, e2019JC015527, https://doi.org/10.1029/2019JC015527

