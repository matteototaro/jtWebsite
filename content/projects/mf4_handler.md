---
title: "DIY Drone"
date: 2022-01-24T18:40:00+02:00
lastmod: 2023-12-27T17:30:00
draft: true

authorLink: "https://mtotaro.com/about"
description: ""
license: "©2026 Matteo Totaro"

tags:
categories:
hiddenFromHomePage: false

featuredImage: ""
featuredImagePreview: "/images/uploads/"

lightgallery: false
linkToMarkdown: false
share:
  enable: false
---

# Handling MF4 Files: Dealing with Duplicates and Signal Processing

**A practical guide to working with automotive measurement data using asammdf, Python, and MATLAB**

---

## The Problem

Working with MF4 (Measurement Data Format 4) files from automotive test benches often presents challenges: duplicate channels, inconsistent sampling rates, and large file sizes. Here's how I tackle these issues in my daily workflow.

## Tools Overview

- **asammdf**: Python library for reading/writing MF4 files
- **NumPy/SciPy**: Signal processing and numerical operations
- **MATLAB**: Advanced signal analysis and visualization
- **Pandas**: Data manipulation and analysis

## Handling Duplicate Channels with asammdf

Duplicate channels appear when multiple ECUs log the same signal or when concatenating measurement files. asammdf provides built-in methods to identify and resolve these.

### Detecting Duplicates

```python
from asammdf import MDF
import numpy as np

# Load MF4 file
mdf = MDF('test_run_001.mf4')

# Get all channel names
channels = [ch.name for ch in mdf.channels_db]

# Find duplicates
from collections import Counter
duplicates = [ch for ch, count in Counter(channels).items() if count > 1]

print(f"Found {len(duplicates)} duplicate channels")
for dup in duplicates:
    print(f"  - {dup}")
```

### Resolving Duplicates

**Strategy 1: Keep the first occurrence**
```python
# Filter out duplicates, keep first occurrence
filtered_signals = {}
for channel in mdf.channels_db:
    if channel.name not in filtered_signals:
        signal = mdf.get(channel.name)
        filtered_signals[channel.name] = signal
```

**Strategy 2: Merge by averaging**
```python
def merge_duplicates(mdf, channel_name):
    """Average duplicate channels with same timestamps"""
    signals = []
    
    # Get all instances of the channel
    for group_idx, channel_idx in mdf.whereis(channel_name):
        sig = mdf.get(channel_name, group=group_idx, index=channel_idx)
        signals.append(sig)
    
    if len(signals) <= 1:
        return signals[0]
    
    # Resample to common timebase
    common_time = signals[0].timestamps
    resampled = [sig.interp(common_time) for sig in signals]
    
    # Average values
    avg_samples = np.mean([sig.samples for sig in resampled], axis=0)
    
    merged = signals[0].copy()
    merged.samples = avg_samples
    return merged
```

**Strategy 3: Select by priority (e.g., CAN vs FlexRay)**
```python
def select_by_source(mdf, channel_name, preferred_source='CAN'):
    """Choose channel based on source bus"""
    for group_idx, channel_idx in mdf.whereis(channel_name):
        group = mdf.groups[group_idx]
        source = group.channel_group.acq_source.name
        
        if preferred_source in source:
            return mdf.get(channel_name, group=group_idx, index=channel_idx)
    
    # Fallback to first occurrence
    return mdf.get(channel_name)
```

## Signal Processing Tasks

### Filtering Noisy Signals

```python
from scipy.signal import butter, filtfilt

def butterworth_filter(signal, cutoff_freq, fs, order=4):
    """Apply Butterworth low-pass filter"""
    nyquist = fs / 2
    normal_cutoff = cutoff_freq / nyquist
    b, a = butter(order, normal_cutoff, btype='low', analog=False)
    
    filtered = filtfilt(b, a, signal.samples)
    
    filtered_signal = signal.copy()
    filtered_signal.samples = filtered
    return filtered_signal

# Example usage
vehicle_speed = mdf.get('VehicleSpeed')
fs = 1 / np.mean(np.diff(vehicle_speed.timestamps))  # Sampling frequency
filtered_speed = butterworth_filter(vehicle_speed, cutoff_freq=5, fs=fs)
```

### Resampling to Uniform Time Base

```python
def resample_to_uniform(mdf, channels, target_rate=100):
    """Resample signals to uniform sampling rate (Hz)"""
    dt = 1.0 / target_rate
    
    # Find time range
    t_start = min(mdf.get(ch).timestamps[0] for ch in channels)
    t_end = max(mdf.get(ch).timestamps[-1] for ch in channels)
    
    uniform_time = np.arange(t_start, t_end, dt)
    
    resampled = {}
    for ch in channels:
        signal = mdf.get(ch)
        resampled[ch] = signal.interp(uniform_time)
    
    return uniform_time, resampled
```

### FFT Analysis

```python
from scipy.fft import fft, fftfreq

def frequency_analysis(signal, plot=True):
    """Perform FFT and return dominant frequencies"""
    samples = signal.samples
    timestamps = signal.timestamps
    
    # Calculate sampling frequency
    fs = 1 / np.mean(np.diff(timestamps))
    n = len(samples)
    
    # Compute FFT
    fft_vals = fft(samples)
    freqs = fftfreq(n, 1/fs)
    
    # Get magnitude spectrum (positive frequencies only)
    magnitude = np.abs(fft_vals[:n//2])
    freqs = freqs[:n//2]
    
    # Find peaks
    from scipy.signal import find_peaks
    peaks, _ = find_peaks(magnitude, height=np.max(magnitude)*0.1)
    
    dominant_freqs = freqs[peaks]
    
    if plot:
        import matplotlib.pyplot as plt
        plt.figure(figsize=(12, 4))
        plt.plot(freqs, magnitude)
        plt.xlabel('Frequency (Hz)')
        plt.ylabel('Magnitude')
        plt.title(f'FFT: {signal.name}')
        plt.grid(True)
        plt.show()
    
    return freqs, magnitude, dominant_freqs
```

## MATLAB Integration

For advanced analysis, I export processed data to MATLAB:

```python
# Export to MAT file for MATLAB processing
from scipy.io import savemat

signals_dict = {
    'time': uniform_time,
    'vehicle_speed': filtered_speed.samples,
    'engine_rpm': mdf.get('EngineRPM').interp(uniform_time).samples,
    'throttle_pos': mdf.get('ThrottlePosition').interp(uniform_time).samples
}

savemat('processed_signals.mat', signals_dict)
```

**MATLAB side:**
```matlab
% Load exported data
data = load('processed_signals.mat');

% Signal processing toolbox
% Design filter
fs = 100; % Hz
fc = 10;  % Cutoff frequency
[b, a] = butter(4, fc/(fs/2), 'low');

% Apply filter
filtered = filtfilt(b, a, data.vehicle_speed);

% Spectral analysis
[pxx, f] = pwelch(data.engine_rpm, [], [], [], fs);
figure;
plot(f, 10*log10(pxx));
xlabel('Frequency (Hz)');
ylabel('Power/Frequency (dB/Hz)');
title('Engine RPM Power Spectral Density');
```

## Real-World Workflow

Here's my typical analysis pipeline:

```python
def process_mf4_file(filepath, output_path):
    """Complete processing pipeline"""
    # 1. Load file
    mdf = MDF(filepath)
    
    # 2. Remove duplicates
    channels_needed = ['VehicleSpeed', 'EngineRPM', 'ThrottlePosition']
    clean_signals = {}
    
    for ch in channels_needed:
        clean_signals[ch] = select_by_source(mdf, ch, preferred_source='CAN')
    
    # 3. Resample to uniform rate
    uniform_time, resampled = resample_to_uniform(
        mdf, channels_needed, target_rate=100
    )
    
    # 4. Apply filters
    for ch in resampled:
        resampled[ch] = butterworth_filter(resampled[ch], cutoff_freq=10, fs=100)
    
    # 5. Export for further analysis
    export_dict = {'time': uniform_time}
    export_dict.update({ch: sig.samples for ch, sig in resampled.items()})
    
    savemat(output_path, export_dict)
    
    print(f"Processed {len(channels_needed)} channels")
    print(f"Output saved to {output_path}")
    
    return export_dict

# Usage
result = process_mf4_file('test_run_001.mf4', 'processed_data.mat')
```

## Performance Tips

**For large files (>1GB):**
- Use memory-mapped mode: `MDF('file.mf4', memory='minimum')`
- Process channels in batches
- Consider downsampling before analysis

**Duplicate handling:**
- Profile your specific data to choose the right strategy
- Document which channels have duplicates and why
- Automate detection in CI/CD pipelines

## Useful Resources

- [asammdf Documentation](https://asammdf.readthedocs.io/)
- [ASAM MDF Standard](https://www.asam.net/standards/detail/mdf/)
- [SciPy Signal Processing](https://docs.scipy.org/doc/scipy/reference/signal.html)

---

**Questions or suggestions?** Feel free to reach out | [← Back to Projects](../)