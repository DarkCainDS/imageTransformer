import React, { useState, useRef } from 'react';

function ImageTransformer() {
    const [imageSrc, setImageSrc] = useState('');
    const canvasRef = useRef(null);

    function handleImageChange(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImageSrc(reader.result);
        };
    }

    function handleApplyFilter() {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                const brightness = (3 * data[i] + 4 * data[i + 1] + data[i + 2]) >>> 3;
                data[i] = brightness;
                data[i + 1] = brightness;
                data[i + 2] = brightness;
            }
            ctx.putImageData(imageData, 0, 0);
        };
    }

    function handleIncreaseSaturation() {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const gray = (r + g + b) / 3;
                data[i] = gray + 2 * (r - gray);
                data[i + 1] = gray + 2 * (g - gray);
                data[i + 2] = gray + 2 * (b - gray);
            }
            ctx.putImageData(imageData, 0, 0);
        };
    }
    function handleLessDesaturate() {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
                data[i] = gray * 0.5 + 0.5 * r;
                data[i + 1] = gray * 0.5 + 0.5 * g;
                data[i + 2] = gray * 0.5 + 0.5 * b;
            }
            ctx.putImageData(imageData, 0, 0);
        };
    }
    function handleMoreContrast() {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            const factor = (259 * (127 + 128)) / (255 * (259 - 128)); // adjust factor as desired
            for (let i = 0; i < data.length; i += 4) {
                data[i] = factor * (data[i] - 128) + 128;
                data[i + 1] = factor * (data[i + 1] - 128) + 128;
                data[i + 2] = factor * (data[i + 2] - 128) + 128;
            }
            ctx.putImageData(imageData, 0, 0);
        };
    }

    function handleLessContrast() {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            const factor = (128 * (259 - 128)) / (259 * (128 + 127)); // adjust factor as desired
            for (let i = 0; i < data.length; i += 4) {
                data[i] = factor * (data[i] - 128) + 128;
                data[i + 1] = factor * (data[i + 1] - 128) + 128;
                data[i + 2] = factor * (data[i + 2] - 128) + 128;
            }
            ctx.putImageData(imageData, 0, 0);
        };
    }

    function handleApplyBlur() {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const blurAmount = 2; // Adjust as desired
            ctx.filter = `blur(${blurAmount}px)`;
            ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
            ctx.filter = 'none';
        };
    }


    function handleDownload() {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = 'image.png';
        link.href = canvas.toDataURL();
        link.click();
    }

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleApplyFilter}>Convertir a escala de grises</button>
            <button onClick={handleIncreaseSaturation}>Aumentar saturación</button>
            <button onClick={handleLessDesaturate}>Desaturar</button>
            <button onClick={handleApplyBlur}>Aplicar desenfoque</button>
            <button onClick={handleMoreContrast}>Más contraste</button>
            <button onClick={handleLessContrast}>Menos contraste</button>


            <div className='canvas-container'>
                <canvas ref={canvasRef} />
            </div>
            <button onClick={handleDownload}>Descargar</button>
        </div>
    );
}

export default ImageTransformer;
