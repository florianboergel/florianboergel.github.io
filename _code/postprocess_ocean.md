---
title: "postprocess esemble simulation"
excerpt: ""
header:
  teaser: /images/output_18_1.png
sidebar:
  - title: "Contribution: Lecturer"
author_profile: true
---

```python
import numpy as np
import xarray as xr
import pylab as plt
import multiprocessing as mp
import sys
import argparse
import os
from scipy.optimize import curve_fit
import glob
from cdo import Cdo
from subprocess import call
cdo = Cdo()
```


```python
import warnings
warnings.filterwarnings("ignore")
```


```python
exp_dict = ({"v1_amplitude_06": "/gfs1/work/mvkfbiow/baltic_past/v1_amplitude_06_tairK",
            "v1_amplitude_07": "/gfs1/work/mvkfbiow/baltic_past/v1_amplitude_07_tairK",
            "v1_amplitude_08": "/gfs1/work/mvkfbiow/baltic_past/v1_amplitude_08_tairK",
            "v1_amplitude_09": "/gfs1/work/mvkfbiow/baltic_past/v1_amplitude_09_tairK"})
```

# Calculate Bottom oxygen and salinity for experiments


```python
for exp, path in exp_dict.items():

    DS = xr.open_mfdataset("{}/*/ocean_day3d.nc".format(path), 
                           concat_dim="time")
    salt = DS.salt.load()
    o2 = DS.t_o2.load()
    h2s = DS.t_h2s.load()

    oxy = (o2 - 2 * h2s) * 22.4e3

    bottom_salinity = np.zeros((salt.shape[0], salt.shape[2], salt.shape[3]))
    bottom_oxygen   = np.zeros((salt.shape[0], salt.shape[2], salt.shape[3]))

    for x in range(0, salt.shape[3]):
        print("\r {}: {} / {}".format(exp, x, salt.shape[3]), end = "")
        for y in range(0, salt.shape[2]):
            tmp = salt[0,:,y,x]
            tmp = tmp.dropna(dim = "st_ocean")
            bottom_salinity[:,y,x] = salt[:, len(tmp) - 1, y, x].values
            bottom_oxygen[:,y,x] = oxy[:, len(tmp) - 1, y, x].values

    ds = xr.Dataset(
        data_vars={'salinity':  (('time', 'yt_ocean', 'xt_ocean'), bottom_salinity),
                   'oxygen': (('time', 'yt_ocean', 'xt_ocean'), bottom_oxygen)},
        coords={'time': salt.time,
                'yt_ocean': salt.yt_ocean,
                'xt_ocean': salt.xt_ocean})

    ds.to_netcdf("/gfs1/work/mvkfbiow/postprocessing_baltic_past/data/{}_bottom_sal_o2.nc".format(exp)
                 , unlimited_dims=['time'])
ds.close()
```

     v1_amplitude_08: 86 / 91

# Open files and concat along new dimension: ensemble


```python
ds_bottom = xr.open_mfdataset("/gfs1/work/mvkfbiow/postprocessing_baltic_past/data/*_bottom_sal_o2.nc",
                           concat_dim = "ensemble")
```


```python
ds_bottom_t = ds_bottom.mean("time")

ds_anomaly = ds_bottom_t.oxygen - ds_bottom_t.oxygen.sel(ensemble = 0)

plt.figure(figsize=(12,8))
ds_anomaly.isel(ensemble=[1,2,3]).plot(col="ensemble", col_wrap = 3)
```




    <xarray.plot.facetgrid.FacetGrid at 0x2aaabb0fb828>




    <Figure size 864x576 with 0 Axes>



![png](/images/postprocess_ocean_files/postprocess_ocean_7_2.png)



```python
ds_bottom_fld = ds_bottom.mean(["xt_ocean", "yt_ocean"])

ds_anomaly_fld = ds_bottom_fld.oxygen - ds_bottom_fld.oxygen.sel(ensemble = 0)

plt.figure(figsize=(12,8))
ds_anomaly_fld.isel(ensemble=[1,2,3]).plot(col="ensemble", col_wrap = 3)
```
