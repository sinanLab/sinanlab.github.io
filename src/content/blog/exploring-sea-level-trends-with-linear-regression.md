---
title: "Exploring Sea-Level Trends with Linear Regression"
description: "A notebook walkthrough of historical CSIRO adjusted sea-level measurements, linear regression, and the limits of extending a trend into the future."
date: 2026-10-14
category: Data analysis
tags: [Python, Data visualization, Climate]
draft: false
placeholder: false
---

## Overview

This notebook explores the historical CSIRO adjusted sea-level dataset. It plots the measurements over time, fits linear regression lines, and illustrates how the fitted trend changes when looking at the full record or a more recent period.

The figures below are static previews. The exported notebook includes the code and analysis steps.

## Historical measurements

The scatter plot shows the adjusted sea-level measurements by year. A linear regression gives a compact summary of the overall direction in the observed data.

![Scatter plot of CSIRO adjusted sea level measurements by year](/images/blogs/freecodecamp/sealevel/SIRO_Adjusted_Sea_Level_scatter_plot.png)

## Fitting a trend

The next figure adds the regression line to the historical measurements.

![Linear regression fitted to the historical CSIRO adjusted sea-level measurements](/images/blogs/freecodecamp/sealevel/SIRO_Adjusted_Sea_Level_regression_curve.png)

Extending a straight line beyond the observed measurements is an extrapolation. It shows what that simple fitted relationship implies; it is not a physical climate model or a reliable forecast on its own.

![Historical measurements with the overall linear regression extended as a projection](/images/blogs/freecodecamp/sealevel/SIRO_Adjusted_Sea_Level_regression_curve_with_prediction_overall.png)

## Looking at a recent period

Fitting a line to a recent subset gives a different view of the trend within that interval. The result depends on the selected start and end years, so it should be read alongside the full-record analysis.

![Linear regression for the selected recent period](/images/blogs/freecodecamp/sealevel/SIRO_Adjusted_Sea_Level_regression_curve_from_current_year.png)

The final plot extends that recent-period line to the notebook's selected endpoint. Like the overall projection, this is a simple linear extrapolation rather than a forecast.

![Recent-period linear regression extended to the selected endpoint](/images/blogs/freecodecamp/sealevel/SIRO_Adjusted_Sea_Level_regression_curve_from_current_year_to_date.png)

## Notebook

[Open the exported notebook in HTML](/files/blogs/freecodecamp/sealevel/notebook.html) to see the code cells, calculations, and full outputs.
