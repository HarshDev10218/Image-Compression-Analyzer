/**
 * Image Compression Comparison Tool - Core Logic Engine
 * Managed state array parsing layer containing real-time canvas serialization and matrix distortion calculus.
 */
class ImageCompressionBenchTool {
    constructor() {
        this.state = {
            rawFile: null,
            imgInstance: null,
            codec: 'image/jpeg',
            quality: 0.75
        };

        this.cacheDOMElements();
        this.bindUserActionEvents();
    }

    cacheDOMElements() {
        this.dom = {
            imageLoader: document.getElementById('imageLoader'),
            fileNameDisplay: document.getElementById('fileNameDisplay'),
            codecSelect: document.getElementById('codecSelect'),
            qualitySlider: document.getElementById('qualitySlider'),
            qualityOutput: document.getElementById('qualityOutput'),
            downloadLink: document.getElementById('downloadLink'),
            qualityTierBanner: document.getElementById('qualityTierBanner'),
            qualityTierText: document.getElementById('qualityTierText'),
            
            // Core Display Containers
            sideOrigImg: document.getElementById('sideOrigImg'),
            sideCompImg: document.getElementById('sideCompImg'),
            
            // Integrated Information Card 1 Hooks
            mDimensions: document.getElementById('mDimensions'),
            mResolution: document.getElementById('mResolution'),
            mPixelCount: document.getElementById('mPixelCount'),
            mOrigFormat: document.getElementById('mOrigFormat'),
            mComputeTime: document.getElementById('mComputeTime'),
            
            // Integrated Information Card 2 Hooks
            mOrigSize: document.getElementById('mOrigSize'),
            mCompSize: document.getElementById('mCompSize'),
            mCompFormat: document.getElementById('mCompFormat'),
            mRatio: document.getElementById('mRatio'),
            mSpaceSaved: document.getElementById('mSpaceSaved'),
            mCompPercentage: document.getElementById('mCompPercentage'),
            
            // Integrated Information Card 3 Hooks
            mImageQuality: document.getElementById('mImageQuality'),
            mQualityLoss: document.getElementById('mQualityLoss'),
            mMSE: document.getElementById('mMSE'),
            mPSNR: document.getElementById('mPSNR'),
            mBPP: document.getElementById('mBPP')
        };
    }

    bindUserActionEvents() {
        this.dom.imageLoader.addEventListener('change', (e) => this.handleImageImportPipeline(e));
        this.dom.codecSelect.addEventListener('change', (e) => { 
            this.state.codec = e.target.value; 
            this.runCompressionMatrixEngine(); 
        });
        this.dom.qualitySlider.addEventListener('input', (e) => this.processQualitySliderUpdate(e));
    }

    processQualitySliderUpdate(event) {
        const factorValue = parseFloat(event.target.value);
        this.state.quality = factorValue;
        this.dom.qualityOutput.textContent = `${Math.round(factorValue * 100)}%`;
        this.runCompressionMatrixEngine();
    }

    async handleImageImportPipeline(event) {
        const file = event.target.files[0];
        if (!file) return;

        this.state.rawFile = file;
        this.dom.fileNameDisplay.textContent = file.name;

        try {
            const compiledImgNode = await this.renderFileToHTMLImage(file);
            this.state.imgInstance = compiledImgNode;

            // Direct Data Injection to UI Preview Components
            this.dom.sideOrigImg.src = compiledImgNode.src;

            // Extract structural metadata metrics for Card 1
            const calculatedTotalPixels = compiledImgNode.naturalWidth * compiledImgNode.naturalHeight;
            this.dom.mDimensions.textContent = `${compiledImgNode.naturalWidth} × ${compiledImgNode.naturalHeight} px`;
            this.dom.mResolution.textContent = `${compiledImgNode.naturalWidth} x ${compiledImgNode.naturalHeight}`;
            this.dom.mPixelCount.textContent = `${(calculatedTotalPixels / 1000000).toFixed(2)} Megapixels`;
            
            // Make MIME types human-friendly 
            const rawExtension = file.type.split('/')[1] || 'Unknown';
            this.dom.mOrigFormat.textContent = rawExtension.toUpperCase();

            // Push size configurations to Card 2
            this.dom.mOrigSize.textContent = this.parseByteScale(file.size);

            // Enable control clusters
            this.dom.codecSelect.disabled = false;
            this.dom.qualitySlider.disabled = false;
            this.dom.qualityTierBanner.classList.remove('hidden');

            this.runCompressionMatrixEngine();
        } catch (error) {
            alert('Security or file parse disruption encountered during image rendering configuration.');
            console.error(error);
        }
    }

    renderFileToHTMLImage(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = e.target.result;
            };
            fileReader.onerror = reject;
            fileReader.readAsDataURL(file);
        });
    }

    runCompressionMatrixEngine() {
        if (!this.state.imgInstance) return;

        const benchmarkTimerStart = performance.now();
        const baseImg = this.state.imgInstance;
        
        const workingCanvas = document.createElement('canvas');
        workingCanvas.width = baseImg.naturalWidth;
        workingCanvas.height = baseImg.naturalHeight;
        const canvasCtx = workingCanvas.getContext('2d');

        // Draw structural opacity block to handle transparency layers inside targets
        canvasCtx.fillStyle = '#ffffff';
        canvasCtx.fillRect(0, 0, workingCanvas.width, workingCanvas.height);
        canvasCtx.drawImage(baseImg, 0, 0);

        workingCanvas.toBlob((outputBlob) => {
            if (!outputBlob) return;
            const benchmarkTimerStop = performance.now();
            
            // Card 1 Benchmark Speed Metric injection
            this.dom.mComputeTime.textContent = `${(benchmarkTimerStop - benchmarkTimerStart).toFixed(1)} ms`;
            
            this.evaluateMetricsAndRender(outputBlob, workingCanvas, canvasCtx);
        }, this.state.codec, this.state.quality);
    }

    evaluateMetricsAndRender(blob, canvasContextRef, ctx) {
        const structuralBlobURL = URL.createObjectURL(blob);
        
        // Relieve browser garbage collection loads by scrubbing stale memory bindings
        if (this.dom.sideCompImg.src.startsWith('blob:')) {
            URL.revokeObjectURL(this.dom.sideCompImg.src);
        }

        this.dom.sideCompImg.src = structuralBlobURL;

        // Extract absolute dimensions sizes
        const primaryMass = this.state.rawFile.size;
        const calculatedCompressedMass = blob.size;
        
        // Card 2 Data Population
        this.dom.mCompSize.textContent = this.parseByteScale(calculatedCompressedMass);
        const formatLabel = this.state.codec === 'image/webp' ? 'WebP Container' : 'JPEG Matrix';
        this.dom.mCompFormat.textContent = formatLabel;

        const reductionRatioValue = (primaryMass / calculatedCompressedMass).toFixed(1);
        this.dom.mRatio.textContent = `${reductionRatioValue}:1`;

        const positiveSavedBytes = Math.max(0, primaryMass - calculatedCompressedMass);
        this.dom.mSpaceSaved.textContent = this.parseByteScale(positiveSavedBytes);

        const calculationPercentageSaved = Math.max(0, (positiveSavedBytes / primaryMass) * 100).toFixed(1);
        this.dom.mCompPercentage.textContent = `${calculationPercentageSaved}% Saved`;

        // Card 3 Quality Metric Mapping Engine
        const quantitativeQualityLoss = Math.round((1 - this.state.quality) * 100);
        this.dom.mQualityLoss.textContent = `${quantitativeQualityLoss}%`;
        this.dom.mImageQuality.textContent = `${Math.round(this.state.quality * 100)}%`;

        const totalPixelsAmount = canvasContextRef.width * canvasContextRef.height;
        const structuralBitsPerPixel = ((calculatedCompressedMass * 8) / totalPixelsAmount).toFixed(3);
        this.dom.mBPP.textContent = `${structuralBitsPerPixel} bpp`;

        // Classification Parsing Logic Loop
        this.classifyAndInjectQualityLabels(quantitativeQualityLoss);

        // Sub-grid signal noise computational pass
        this.executePixelSignalNoiseCalculus(canvasContextRef, ctx, structuralBlobURL);

        // Enable Export Features
        this.dom.downloadLink.disabled = false;
        this.dom.downloadLink.onclick = () => {
            const targetExtension = this.state.codec === 'image/webp' ? 'webp' : 'jpg';
            const strippedName = this.state.rawFile.name.substring(0, this.state.rawFile.name.lastIndexOf('.'));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.download = `${strippedName}_compressed.${targetExtension}`;
            downloadAnchorNode.href = structuralBlobURL;
            downloadAnchorNode.click();
        };
    }

    classifyAndInjectQualityLabels(lossPercent) {
        let labelString = '';
        if (lossPercent <= 10) {
            labelString = 'Excellent (0–10% quality loss)';
        } else if (lossPercent <= 25) {
            labelString = 'Very Good (10–25% quality loss)';
        } else if (lossPercent <= 40) {
            labelString = 'Good (25–40% quality loss)';
        } else if (lossPercent <= 60) {
            labelString = 'Noticeable Loss (40–60% quality loss)';
        } else {
            labelString = 'Poor Quality (60%+ quality loss)';
        }

        this.dom.qualityTierText.textContent = labelString;
    }

    executePixelSignalNoiseCalculus(srcCanvas, srcCtx, targetUrl) {
        const comparativeImgObject = new Image();
        comparativeImgObject.onload = () => {
            const analysisCanvas = document.createElement('canvas');
            const optimizedSampleWidth = Math.min(srcCanvas.width, 500);
            const optimizedSampleHeight = Math.min(srcCanvas.height, Math.round(srcCanvas.height * (optimizedSampleWidth / srcCanvas.width)));
            
            analysisCanvas.width = optimizedSampleWidth;
            analysisCanvas.height = optimizedSampleHeight;
            const analyticalCtx = analysisCanvas.getContext('2d');
            analyticalCtx.drawImage(comparativeImgObject, 0, 0, optimizedSampleWidth, optimizedSampleHeight);

            const processingSourceCanvas = document.createElement('canvas');
            processingSourceCanvas.width = optimizedSampleWidth;
            processingSourceCanvas.height = optimizedSampleHeight;
            const processingCtx = processingSourceCanvas.getContext('2d');
            processingCtx.drawImage(this.state.imgInstance, 0, 0, optimizedSampleWidth, optimizedSampleHeight);

            const matrixDataOriginal = processingCtx.getImageData(0, 0, optimizedSampleWidth, optimizedSampleHeight).data;
            const matrixDataCompressed = analyticalCtx.getImageData(0, 0, optimizedSampleWidth, optimizedSampleHeight).data;

            let accumulatedSquaredError = 0;
            const byteDataArrayLength = matrixDataOriginal.length;

            for (let cursor = 0; cursor < byteDataArrayLength; cursor += 4) {
                const redDelta = matrixDataOriginal[cursor] - matrixDataCompressed[cursor];
                const greenDelta = matrixDataOriginal[cursor+1] - matrixDataCompressed[cursor+1];
                const blueDelta = matrixDataOriginal[cursor+2] - matrixDataCompressed[cursor+2];

                accumulatedSquaredError += (redDelta * redDelta) + (greenDelta * greenDelta) + (blueDelta * blueDelta);
            }

            const calculatedMeanSquaredError = accumulatedSquaredError / ((byteDataArrayLength / 4) * 3);
            this.dom.mMSE.textContent = calculatedMeanSquaredError.toFixed(2);

            if (calculatedMeanSquaredError === 0) {
                this.dom.mPSNR.textContent = '∞ Lossless';
            } else {
                const calculatedPeakSignalToNoiseRatio = 10 * Math.log10((255 * 255) / calculatedMeanSquaredError);
                this.dom.mPSNR.textContent = `${calculatedPeakSignalToNoiseRatio.toFixed(2)} dB`;
            }
        };
        comparativeImgObject.src = targetUrl;
    }

    parseByteScale(bytes) {
        if (bytes === 0) return '0 Bytes';
        const binaryFactor = 1024;
        const scalingUnitsList = ['Bytes', 'KB', 'MB'];
        const listIndexPosition = Math.floor(Math.log(bytes) / Math.log(binaryFactor));
        return parseFloat((bytes / Math.pow(binaryFactor, listIndexPosition)).toFixed(2)) + ' ' + scalingUnitsList[listIndexPosition];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.AppBenchInstance = new ImageCompressionBenchTool();
});