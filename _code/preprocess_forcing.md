---
title: "Preprocess forcing for esemble simulation"
excerpt: ""
header:
  teaser: /images/output_18_1.png
sidebar:
  - title: "Contribution: Lecturer"
author_profile: true
---


# Change forcing RCA3


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

# Find fit for MCA and LIA in RCA3


```python
ds = xr.open_dataset("/gfs1/work/mvkfbiow/postprocessing_baltic_past" + 
                     "/data/rca_temp_full.nc")

temp1d = ds.temp.mean(["lon", "lat"])
temp1d_m = temp1d.rolling(time=365, min_periods=1).mean()
x = np.arange(len(temp1d))

def do_fit(x,temp1d_m):
    """
    Polyfit function 
    """
    fit_params = np.polyfit(x, temp1d_m.values, 3)
    z = np.poly1d(fit_params)
    predict = z(x)
    return predict

predict = do_fit(np.arange(0, len(temp1d_m)), temp1d_m)
polynom_fit = xr.DataArray(predict, coords=[temp1d.time])

def do_sin_fit(x, freq, amplitude):
    return np.sin(x * freq ) * amplitude + 275.50742


popt, pcov = curve_fit(do_sin_fit, x, predict, bounds=(1/3000, [1/1900, 0.4]))
original_sin_fit = do_sin_fit(x, *popt)
original_sin_fit = xr.DataArray(original_sin_fit, coords=[temp1d.time])
```


```python
amplitudes = [0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
```


```python
plt.figure(figsize=(12, 8))

ax = plt.subplot(111)
ax.spines["top"].set_visible(False)
ax.spines["bottom"].set_visible(False)
ax.spines["right"].set_visible(False)
ax.spines["left"].set_visible(False)

ax.get_xaxis().tick_bottom()
ax.get_yaxis().tick_left()

ax.yaxis.grid()

temp1d.rolling(time=365).mean().plot(ax=ax)

for i in amplitudes:
    original_sin_fit = do_sin_fit(x, popt[0], i)
    original_sin_fit = xr.DataArray(original_sin_fit, coords=[temp1d.time])
    original_sin_fit.plot(ax = ax, alpha = 0.9, color = "green", label="Sinus fit {}".format(i), )
    
polynom_fit.plot(ax = ax, alpha = 0.3, color = "red", label="Polynom", )
ax.legend()
plt.title("Spatial Averaged Temperature", fontsize=17, ha="center") 
plt.text(-0.1, -0.2,"Data: Regional Climate Model (RCA3), Schimanke et. al, 2012",
    horizontalalignment='left',
    verticalalignment='center',
    transform = ax.transAxes)

```




    Text(-0.1, -0.2, 'Data: Regional Climate Model (RCA3), Schimanke et. al, 2012')




![png](/images/preprocess_forcing_files/preprocess_forcing_6_1.png)


# Construct new data with fit


```python
ds3 = xr.Dataset({'data': (('time'), temp1d.values)},
                {'time': temp1d_m.time})

for i in amplitudes:
    original_sin_fit = do_sin_fit(x, popt[0], i)
    original_sin_fit = xr.DataArray(original_sin_fit, coords=[temp1d.time])
    var = temp1d - temp1d.mean()         # get variance in data
    new = var + original_sin_fit         # estimate new data with variance and fit
    diffs = new - temp1d               # diff between new and old
    new = new.where(diffs > 0, other=temp1d)
    diffs = new - temp1d
    ds3['new_data_{}'.format(i)] = new
    ds3['diffs_{}'.format(i)] = diffs

```


```python
plt.figure(figsize=(12, 8))

ax = plt.subplot(211)
ax.spines["top"].set_visible(False)
ax.spines["bottom"].set_visible(False)
ax.spines["right"].set_visible(False)
ax.spines["left"].set_visible(False)

ax.get_xaxis().tick_bottom()
ax.get_yaxis().tick_left()

ax.yaxis.grid()

jet= plt.get_cmap('Spectral_r')
colors = iter(jet(np.linspace(0,1,6)))

ds3.data.rolling(time=365).mean().plot(ax = ax, alpha = 0.3, color = "blue", label="Original data", )
for i in amplitudes:
    ds3['new_data_{}'.format(i)].rolling(time=365).mean().plot(ax = ax, alpha = 0.8, color = next(colors), label="New data {}".format(i))
ax.legend()
plt.title("New temperature Data for MCA", fontsize=17, ha="center") 

ax = plt.subplot(212)
ax.spines["top"].set_visible(False)
ax.spines["bottom"].set_visible(False)
ax.spines["right"].set_visible(False)
ax.spines["left"].set_visible(False)

ax.get_xaxis().tick_bottom()
ax.get_yaxis().tick_left()

ax.yaxis.grid()
colors = iter(jet(np.linspace(0,1,6)))
for i in amplitudes:
    ds3['diffs_{}'.format(i)].plot(ax = ax, alpha = 0.9, color = next(colors), label="Difference {}".format(i), )

    ax.legend()
plt.title("Spatial Averaged Temperature", fontsize=17, ha="center") 
plt.text(-0.1, -0.2,"Data: Regional Climate Model (RCA3), Schimanke et. al, 2012",
    horizontalalignment='left',
    verticalalignment='center',
    transform = ax.transAxes)
plt.tight_layout()
```


![png](/images/preprocess_forcing_files/preprocess_forcing_9_0.png)


# Store Sin fits


```python
for i in amplitudes:
    original_sin_fit = do_sin_fit(x, popt[0], i)
    original_sin_fit = xr.DataArray(original_sin_fit, coords=[temp1d.time]).rename("data")
    original_sin_fit.to_netcdf("/gfs1/work/mvkfbiow/postprocessing_baltic_past/data/" 
                               + "ref_for_temp_change_{}.nc".format(i))
```

# Apply Change

Changes air temperature by applying sinus fit + variations

Note: `ref_for_temp_change.nc` estimated on local machine in /work/publications/AMO_ERGOM/prep...


```python
exp_dict = ({"original": "rca_temp_full.nc"})
for i in amplitudes:
    exp_dict[str(i)] = "tairK_amplitude_{}.mom.data.nc".format(i)


    plot = False
    for count, year in enumerate(range(961, 1451)):
            print("\r" + str(year) , end="")
            ds = xr.open_mfdataset("/gfs2/work/mviowmod/DATABASE/BALTIC_MOM/forcing_950-1800/mom/{}/tairK.mom.dta.nc".format(year)).load()
            ds2 = xr.open_dataset("/gfs1/work/mvkfbiow/postprocessing_baltic_past/data/ref_for_temp_change_{}.nc".format(i)).load()
            ref_temp = 275.50696

            ds3 = ds.copy(deep=True)
            for index, month in enumerate(range(1, 13)):
                current_selection = ds.sel(TIME='{}-{}'.format(str(year).zfill(4),str(month).zfill(2))).tairK.copy()
                new = (current_selection - ref_temp) + ds2.sel(time=str(year+50).zfill(4)).isel(time=index).data.values 
                ds3.tairK.loc[dict(TIME='{}-{}'.format(str(year).zfill(4),str(month).zfill(2)))] = new.values
            ds3.to_netcdf("/gfs1/work/mvkfbiow/forcing_950-1800/mom/{}/{}".format(year, exp_dict[str(i)]), unlimited_dims=['TIME'])


#    if plot == True:
#        diff = ds3 - ds#
#
#        f, (ax,ax2,ax3) = plt.subplots(3)
#        ds3.mean(["XLON", "YLAT"]).tairK.plot(ax=ax)
#        ds.mean(["XLON", "YLAT"]).tairK.plot(ax=ax)
#        ds3.isel(TIME=1).tairK.plot.pcolormesh(ax=ax2, vmin=260, vmax=290)
#        ds.isel(TIME=1).tairK.plot.pcolormesh(ax=ax3, vmin=260, vmax=290)
```

# Merge data for validation


```python
print(exp_dict)
```

    {'original': '/gfs1/work/mvkfbiow/postprocessing_baltic_past/data/rca_temp_full.nc', '0.4': 'tairK_amplitude_0.4.mom.data.nc', '0.5': 'tairK_amplitude_0.5.mom.data.nc', '0.6': 'tairK_amplitude_0.6.mom.data.nc', '0.7': 'tairK_amplitude_0.7.mom.data.nc', '0.8': 'tairK_amplitude_0.8.mom.data.nc', '0.9': 'tairK_amplitude_0.9.mom.data.nc'}



```python
path_forcing = "/gfs1/work/mvkfbiow/forcing_950-1800/mom"
BEGIN = 951
END = 961


for count in amplitudes:
    fname = exp_dict[str(count)]

    for i in range(BEGIN, END):
        cdo.monmean(input=path_forcing + "/" + str(i) + "/" + str(fname), output="/gfs1/work/mvkfbiow/postprocessing_baltic_past/data/" +
                    str(i).zfill(4) + "_" + fname)

    cdo.mergetime(input="/gfs1/work/mvkfbiow/postprocessing_baltic_past/data/????_" + fname,
                  output="/gfs1/work/mvkfbiow/postprocessing_baltic_past/data/" + fname)

    files = glob.glob("/gfs1/work/mvkfbiow/postprocessing_baltic_past/data/????_" + fname)

    for f in files:
        os.remove(f)
```


```python
plt.figure(figsize=(12, 8))

# Remove the plot frame lines. They are unnecessary chartjunk.
ax = plt.subplot(111)
ax.spines["top"].set_visible(False)
ax.spines["bottom"].set_visible(False)
ax.spines["right"].set_visible(False)
ax.spines["left"].set_visible(False)

ax.get_xaxis().tick_bottom()
ax.get_yaxis().tick_left()

ax.yaxis.grid()

for keys, name in exp_dict.items():
    DS = xr.open_dataset("/gfs1/work/mvkfbiow/postprocessing_baltic_past/data/" + name)
    try:
        volume_flow = DS.tairK.mean(["XLON", "YLAT"])
    except:
        volume_flow = DS.temp.mean(["lon", "lat"])    
    volume_flow.name = name
    volume_flow.plot(ax = ax, alpha = 0.3, color = "blue", label="", )
plt.title("tairK RCA3; shifted by 50 years", fontsize=17, ha="center") 
plt.text(-0.1, -0.2,"Data: Regional Climate Model (RCA3), Schimanke et. al, 2012",
    horizontalalignment='left',
    verticalalignment='center',
    transform = ax.transAxes)
plt.savefig("../tmp.png", dpi = 300)
```

# Correct Humidity for new temperature


```python
class specific_humidity():
    """
    Calculates original RH and vapour pressure (e),
    and saturation vapour pressure (es)
    using temperature, pressure, humidity
    
    Recalculates SH for new temperature using old RH and new 
    es to calculate e. e is used to calculate new SH.
    
    es is calculated using Clausis-Clapeyron
    """
    
    def __init__(self, p, q, t):
        self.rd = 287.058
        self.rv = 461.52
        self.t = t
        self.p = p
        self.q = q
        
        self.e = self.q * self.p / (0.378 * self.q + 0.622)
        self.es = 611 * np.exp(17.67*(self.t-273.15)/(self.t-29.65)) 
        self.rh = self.e / self.es 
        
    def calc_q(self, t):
        es = 611 * np.exp(17.67*(t-273.15)/(t-29.65)) 
        e = self.rh * es
        self.q2 = ( self.rd * e / (self.rv*(self.p-e))).rename("shumi")
        return self.q2
```


```python
for i in amplitudes:
    fname = exp_dict[str(i)]
    print(fname)

    for year in range(951, 961):
        print("\r" + str(year) , end="")
        t_new = xr.open_dataset("/gfs1/work/mvkfbiow/forcing_950-1800/mom/" + str(year) + "/" + fname)
        p = xr.open_dataset("/gfs2/work/mviowmod/DATABASE/BALTIC_MOM/forcing_950-1800/mom/" + str(year) + "/pair.mom.dta.nc")
        t = xr.open_dataset("/gfs2/work/mviowmod/DATABASE/BALTIC_MOM/forcing_950-1800/mom/" + str(year) + "/tairK.mom.dta.nc")
        q = xr.open_dataset("/gfs2/work/mviowmod/DATABASE/BALTIC_MOM/forcing_950-1800/mom/" + str(year) + "/shumi.mom.dta.nc")
        calc_hum = specific_humidity(p.pair, q.shumi, t.tairK)
        s1 = calc_hum.calc_q(t_new.tairK).to_dataset(name = 'shumi')
        s1.to_netcdf("/gfs1/work/mvkfbiow/forcing_950-1800/mom/" + str(year) + "/shumi" + fname.strip("tairK"), unlimited_dims=['TIME'])
```

    tairK_amplitude_0.4.mom.data.nc
    951
    952
    953
    954
    955
    956
    957
    958
    959
    960
    tairK_amplitude_0.5.mom.data.nc
    951
    952
    953
    954
    955
    956
    957
    958
    959
    960
    tairK_amplitude_0.6.mom.data.nc
    951
    952
    953
    954
    955
    956
    957
    958
    959
    960
    tairK_amplitude_0.7.mom.data.nc
    951
    952
    953
    954
    955
    956
    957
    958
    959
    960
    tairK_amplitude_0.8.mom.data.nc
    951
    952
    953
    954
    955
    956
    957
    958
    959
    960
    tairK_amplitude_0.9.mom.data.nc
    951
    952
    953
    954
    955
    956
    957
    958
    959
    960


# Issues with grid?

had issues with saturation pressure overflow, `cdo setgrid` resolved this

/gfs1/work/mvkfbiow/forcing_950-1800/mom/ contains .sh script with cdo setgrid




```python
mygrid = "/gfs1/work/mvkfbiow/forcing_950-1800/mom/951/swdn.rco.dta.nc"

for i in amplitudes:
    ifile = "shumi" + exp_dict[str(i)].strip("tairK")
    print(ifile)

    for year in range(952, 961):
        cdo.setgrid(mygrid, 
                    input="/gfs1/work/mvkfbiow/forcing_950-1800/mom/{}/".format(year) + ifile,
                    output="/gfs1/work/mvkfbiow/forcing_950-1800/mom/{}/".format(year) + "tmp.nc")
        call("module load nco && ncatted -a calendar,TIME,o,c,julian /gfs1/work/mvkfbiow/forcing_950-1800/mom/{}/".format(year) + "tmp.nc", shell=True)
        os.rename("/gfs1/work/mvkfbiow/forcing_950-1800/mom/{}/".format(year) + "tmp.nc",
                  "/gfs1/work/mvkfbiow/forcing_950-1800/mom/{}/".format(year) + ifile)
```

    shumi_amplitude_0.4.mom.data.nc
    shumi_amplitude_0.5.mom.data.nc
    shumi_amplitude_0.6.mom.data.nc
    shumi_amplitude_0.7.mom.data.nc
    shumi_amplitude_0.8.mom.data.nc
    shumi_amplitude_0.9.mom.data.nc


# Validate new humidity

open_mfdataset( concat new dimension )


```python
"""
enter year of interest
"""

year = 960

orig = xr.open_dataset("/gfs2/work/mviowmod/DATABASE/BALTIC_MOM/forcing_950-1800/mom/{}/shumi.mom.dta.nc".format(year))
orig_t = xr.open_dataset("/gfs2/work/mviowmod/DATABASE/BALTIC_MOM/forcing_950-1800/mom/{}/tairK.mom.dta.nc".format(year))
orig_gotland = orig.mean(["XLON", "YLAT"]).load()
orig_gotland_t = orig_t.mean(["XLON", "YLAT"]).load()
plt.figure(figsize=(12, 8))

jet= plt.get_cmap('Spectral_r')
colors = iter(jet(np.linspace(0,1,6)))

# Remove the plot frame lines. They are unnecessary chartjunk.
ax = plt.subplot(211)
ax.spines["top"].set_visible(False)
ax.spines["bottom"].set_visible(False)
ax.spines["right"].set_visible(False)
ax.spines["left"].set_visible(False)

ax.get_xaxis().tick_bottom()
ax.get_yaxis().tick_left()

ax.yaxis.grid()

plt.title("Specific Humidity", fontsize=17, ha="center") 

ax2 = plt.subplot(212)

ax2.spines["top"].set_visible(False)
ax2.spines["bottom"].set_visible(False)
ax2.spines["right"].set_visible(False)
ax2.spines["left"].set_visible(False)

ax2.get_xaxis().tick_bottom()
ax2.get_yaxis().tick_left()

ax2.yaxis.grid()

orig_gotland.shumi.plot(ax = ax, alpha = 0.3, color = "blue", label="Original", )

for i in amplitudes:
    col = next(colors)
    ifiles = "shumi" + exp_dict[str(i)].strip("tairK")
    ifilet = exp_dict[str(i)]
    new = xr.open_dataset("/gfs1/work/mvkfbiow/forcing_950-1800/mom/{}/{}".format(year, ifiles))
    new_t = xr.open_dataset("/gfs1/work/mvkfbiow/forcing_950-1800/mom/{}/{}".format(year, ifilet))
    new_gotland = new.mean(["lon", "lat"]).load()
    new_gotland_t = new_t.mean(["XLON", "YLAT"]).load()
    new_gotland.shumi.plot(ax = ax, alpha = 0.3, color = col, label="Shumi amp {}".format(i), )
    
    (- orig_gotland_t.tairK + new_gotland_t.tairK).plot(ax = ax2, alpha = 0.9, color = col, label="Diff temp amp {}".format(i))

ax.legend()
ax2.legend()
plt.title("Temperature", fontsize=17, ha="center")
plt.text(-0.1, -0.2,"Data: Regional Climate Model (RCA3), Schimanke et. al, 2012",
    horizontalalignment='left',
    verticalalignment='center',
    transform = ax.transAxes)
plt.tight_layout()
```


![png](/images/preprocess_forcing_files/preprocess_forcing_24_0.png)



```python
ds = xr.open_dataset("/gfs1/work/mvkfbiow/forcing_950-1800/mom/951/shumi.mom.dta.nc")
ds_s = xr.open_dataset("/gfs1/work/mvkfbiow/forcing_950-1800/mom/951/shumi_amplitude_05.mom.data.nc")
print(ds_s)
print(ds)
```

    <xarray.Dataset>
    Dimensions:  (TIME: 3416, XLON: 129, YLAT: 89)
    Coordinates:
      * XLON     (XLON) float64 7.5 7.75 8.0 8.25 8.5 ... 38.5 38.75 39.0 39.25 39.5
      * YLAT     (YLAT) float64 49.5 49.75 50.0 50.25 50.5 ... 70.75 71.0 71.25 71.5
      * TIME     (TIME) object 0950-12-01 00:00:00 ... 0952-01-31 21:00:00
    Data variables:
        shumi    (TIME, YLAT, XLON) float32 ...
    <xarray.Dataset>
    Dimensions:  (TIME: 3416, XLON: 129, YLAT: 89)
    Coordinates:
      * XLON     (XLON) float64 7.5 7.75 8.0 8.25 8.5 ... 38.5 38.75 39.0 39.25 39.5
      * YLAT     (YLAT) float64 49.5 49.75 50.0 50.25 50.5 ... 70.75 71.0 71.25 71.5
      * TIME     (TIME) object 0950-12-01 00:00:00 ... 0952-01-31 21:00:00
    Data variables:
        shumi    (TIME, YLAT, XLON) float32 ...
    Attributes:
        CDI:          Climate Data Interface version 1.9.0 (http://mpimet.mpg.de/...
        Conventions:  CF-1.0
        CDO:          Climate Data Operators version 1.9.0 (http://mpimet.mpg.de/...
        history:      Thu Nov 23 11:56:52 2017: ncatted -a calendar,TIME,o,c,juli...
        NCO:          4.6.7

