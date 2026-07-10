# Image Compression Comparison Tool

> **Upload an image, compare compression levels, and view file size, quality, and compression statistics.**

An advanced, 100% client-side engineering workbench built to evaluate real-time pixel-level distortion matrices against structural storage optimization boundaries. By utilizing browser-native hardware-accelerated canvas components, the application parses, compresses, and benchmarks source assets瞬间 without transmitting user files to an external backend server.

---

## 🚀 Key Features & UI Modules

### 🛠️ Control Panel
*   **Upload Image:** Handles dynamic byte parsing for standard web image containers (`.jpg`, `.png`, `.webp`).
*   **Image Format:** Toggle target outputs on-the-fly between **JPEG (Standard Lossy)** quantization frames and **WebP (Modern Optimized)** predictive block encodings.
*   **Compression Quality:** Real-time range modulation input scale matching granular byte streams immediately.
*   **Download Compressed Image:** Instantly exports your structural variant with automated file extensions (`_compressed.jpg` or `_compressed.webp`).

### 📊 Real-Time Telemetry Cards

#### Card 1: Image Information
*   **Image Dimensions:** Displays the structural pixel layout width and height.
*   **Image Resolution:** Tracks the resolution density grid of the active canvas.
*   **Total Pixels:** Calculated mass layout count (e.g., Megapixels count).
*   **Original Format:** Tracks historical file container headers before transformation.
*   **Compression Time:** Benchmark tracking capturing performance matrix processing speeds.

#### Card 2: Compression Details
*   **Original File Size:** Baseline mass payload of the uncompressed asset.
*   **Compressed File Size:** Shrinkage mass tracking metric after encoder pass.
*   **Compression Format:** Displays the current target codec container format (JPEG/WebP).
*   **Compression Ratio:** Computes delta reduction scale factor (e.g., 4.2:1).
*   **File Size Saved:** Absolute physical storage weight removed from the disk.
*   **Compression Percentage:** Optimization efficiency scale savings indicator.

#### Card 3: Quality Information
*   **Image Quality:** Current baseline index input target value (1-100%).
*   **Estimated Quality Loss:** Direct visual inversion calculation from quality thresholds.
*   **Mean Squared Error (MSE):** Measures mathematical pixel stream deviation variance.
*   **Peak Signal-to-Noise Ratio (PSNR):** Tracks signal reconstruction quality accuracy in decibels (dB).
*   **Bits Per Pixel (BPP):** Entropy information data density factor across physical dimensions.

### 🔍 Permanent Side-by-Side View
*   Presents the original source frame side-by-side with the target compression matrix variant to instantly evaluate macroblock noise, structural blur, and pixel artifacts.

### 🏷️ Compression Quality Labels
The tool automatically gauges loss margins to categorize structural output ratings:
*   **Excellent** (0–10% quality loss)
*   **Very Good** (10–25% quality loss)
*   **Good** (25–40% quality loss)
*   **Noticeable Loss** (40–60% quality loss)
*   **Poor Quality** (60%+ quality loss)

---

## 📂 Project Architecture

The workbench uses a clean, zero-dependency file tree structure designed for instant deployment:

```bash
├── index.html   # Main application DOM layout template structure
├── styles.css   # Custom midnight-palette presentation stylesheet theme
└── app.js       # Core state manager, canvas encoder, and math analysis engine
