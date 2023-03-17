import React, { useState, useRef, useEffect } from 'react';
import { FiArrowUpCircle } from "react-icons/fi";
import { FiArrowLeftCircle } from "react-icons/fi";


function ImageTransformer({ name2, clan2 }) {

  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState('');
  const canvasRef = useRef(null);
  const [namePerson, setNamePerson] = useState(name2);
  const [nameClan, setNameClan] = useState(clan2);
  const [downloadAll, setDownloadAll] = useState(false);
  const [downloadAllResized, setDownloadAllResized] = useState(false);



  function handleDownloadAll() {
    const filters = [

      { name: "grayscale", func: handleGrayscale },
      { name: "double-saturation", func: () => { handleSaturation(2) } },
      { name: "1.5-saturation", func: () => { handleSaturation(1.5) } },
      { name: "0.5-unsaturate", func: () => { handleSaturation(0.5) } },
      { name: "0.25-unsaturate", func: () => { handleSaturation(0.25) } },
      { name: "DoubleContrast", func: () => { handleContrast(200) } },
      { name: "1.5-Contrast", func: () => { handleContrast(150) } },
      { name: "0.5-Contrast", func: () => { handleContrast(100) } },
      { name: "0.25-Contrast", func: () => { handleContrast(50) } },
      { name: "Minimum-Blur", func: () => {handleApplyBlurAll(0.1)} },
      { name: "A-BitOfBlur", func: () => {handleApplyBlurAll(0.5)} },
      { name: "A-BitMoreOfBlur", func: () => {handleApplyBlurAll(1)} },
      { name: "Some-Blur", func: () => {handleApplyBlurAll(1.5)} },
      { name: "Lot-Blur", func: () => {handleApplyBlurAll(2)} },
      { name: "MaybeToMuch-Blur", func: () => {handleApplyBlurAll(4)} },
      { name: "resizeTo_1920x1280", func: () => {handleResizeAll(1920,1280)} },
      { name: "resizeTo_720x480", func: () => {handleResizeAll(720,480)} },
      { name: "resizeTo_480x260", func: () => {handleResizeAll(480,260)} },
      { name: "resizeTo_256x256", func: () => {handleResizeAll(256,256)} },
      { name: "opacity-1", func: () => { handleOpacityAll(1) } },
      { name: "opacity-0.7", func: () => { handleOpacityAll(0.7) } },
      { name: "opacity-0.5", func: () => { handleOpacityAll(0.5) } },
      { name: "opacity-0.25", func: () => { handleOpacityAll(0.25) } },
      { name: "opacity-0.09", func: () => { handleOpacityAll(0.09) } },
      { name: "Brightness-100", func: () => { handleLessBrightnessAll("brightness(100%)") } },
      { name: "Brightness-75", func: () => { handleLessBrightnessAll("brightness(75%)") } },
      { name: "Brightness-50", func: () => { handleLessBrightnessAll("brightness(50%)") } },
      { name: "Brightness-25", func: () => { handleLessBrightnessAll("brightness(25%)") } },
      { name: "Brightness-10", func: () => { handleLessBrightnessAll("brightness(10%)") } },
      { name: "Brightness-0.9", func: () => { handleLessBrightnessAll("brightness(0.9%)") } },
      { name: "invert-100", func: () => { handleInvertAll("invert(100%)") } },
      { name: "invert-75", func: () => { handleInvertAll("invert(75%)") } },
      { name: "invert-50", func: () => { handleInvertAll("invert(50%)") } },
      { name: "invert-25", func: () => { handleInvertAll("invert(25%)") } },
      { name: "invert-10", func: () => { handleInvertAll("invert(10%)") } },
      { name: "handleHueRotate270", func: () => { handleHueRotateAll("hue-rotate(300deg)") } },
      { name: "handleHueRotate180", func: () => { handleHueRotateAll("hue-rotate(250deg)") } },
      { name: "handleHueRotate90", func: () => { handleHueRotateAll("hue-rotate(200deg)") } },
      { name: "handleHueRotate270", func: () => { handleHueRotateAll("hue-rotate(180deg)") } },
      { name: "handleHueRotate180", func: () => { handleHueRotateAll("hue-rotate(150deg)") } },
      { name: "handleHueRotate90", func: () => { handleHueRotateAll("hue-rotate(130deg)") } },
      { name: "handleHueRotate270", func: () => { handleHueRotateAll("hue-rotate(100deg)") } },
      { name: "handleHueRotate180", func: () => { handleHueRotateAll("hue-rotate(80deg)") } },
      { name: "handleHueRotate90", func: () => { handleHueRotateAll("hue-rotate(60deg)") } },
      { name: "handleHueRotate270", func: () => { handleHueRotateAll("hue-rotate(40deg)") } },
      { name: "handleHueRotate180", func: () => { handleHueRotateAll("hue-rotate(20deg)") } },
      { name: "handleHueRotate90", func: () => { handleHueRotateAll("hue-rotate(10deg)") } },
      { name: "handleRotation_90°", func: handleRotation },
      { name: "handleReflection_180°", func: handleReflection },
      { name: "handleSepia", func: () => { handleSepiaLevel(100) } },
      { name: "handleSepia", func: () => { handleSepiaLevel(75) } },
      { name: "handleSepia", func: () => { handleSepiaLevel(50) } },
      { name: "handleSepia", func: () => { handleSepiaLevel(25) } },
      { name: "handleBorder", func: handleBorder },
      { name: "handleDropShadow", func: handleDropShadow },

    ];

    const canvas = canvasRef.current;
    const link = document.createElement("a");
    document.body.appendChild(link);

    filters.reduce((promise, { name, func }) => {
      return promise.then(() => {
        return new Promise((resolve) => {
          func();
          setTimeout(() => {
            link.href = canvas.toDataURL();
            link.download = `${name}.png`;
            link.click();
            resolve();
          }, 100); // wait for canvas to update
        });
      });
    }, Promise.resolve());
  }
  function handleDownloadAllResized() {
    const filters = [

      { name: "grayscale", func: handleGrayscaleResized },
      { name: "double-saturation", func: () => { handleSaturationResized(2) } },
      { name: "1.5-saturation", func: () => { handleSaturationResized(1.5) } },
      { name: "0.5-unsaturate", func: () => { handleSaturationResized(0.5) } },
      { name: "0.25-unsaturate", func: () => { handleSaturationResized(0.25) } },
      { name: "DoubleContrast", func: () => { handleContrastResized(200) } },
      { name: "1.5-Contrast", func: () => { handleContrastResized(150) } },
      { name: "0.5-Contrast", func: () => { handleContrastResized(100) } },
      { name: "0.25-Contrast", func: () => { handleContrastResized(50) } },
      { name: "Minimum-Blur", func: () => {handleApplyBlurAllResized(0.1)} },
      { name: "A-BitOfBlur", func: () => {handleApplyBlurAllResized(0.5)} },
      { name: "A-BitMoreOfBlur", func: () => {handleApplyBlurAllResized(1)} },
      { name: "Some-Blur", func: () => {handleApplyBlurAllResized(1.5)} },
      { name: "Lot-Blur", func: () => {handleApplyBlurAllResized(2)} },
      { name: "MaybeToMuch-Blur", func: () => {handleApplyBlurAllResized(4)} },
      { name: "opacity-1", func: () => { handleOpacityAllResized(1) } },
      { name: "opacity-0.7", func: () => { handleOpacityAllResized(0.7) } },
      { name: "opacity-0.5", func: () => { handleOpacityAllResized(0.5) } },
      { name: "opacity-0.25", func: () => { handleOpacityAllResized(0.25) } },
      { name: "opacity-0.09", func: () => { handleOpacityAllResized(0.09) } },
      { name: "Brightness-100", func: () => { handleLessBrightnessAllResized("brightness(100%)") } },
      { name: "Brightness-75", func: () => { handleLessBrightnessAllResized("brightness(75%)") } },
      { name: "Brightness-50", func: () => { handleLessBrightnessAllResized("brightness(50%)") } },
      { name: "Brightness-25", func: () => { handleLessBrightnessAllResized("brightness(25%)") } },
      { name: "Brightness-10", func: () => { handleLessBrightnessAllResized("brightness(10%)") } },
      { name: "Brightness-0.9", func: () => { handleLessBrightnessAllResized("brightness(0.9%)") } },

      { name: "invert-100", func: () => { handleInvertAllResized("invert(100%)") } },
      { name: "invert-75", func: () => { handleInvertAllResized("invert(75%)") } },
      { name: "invert-50", func: () => { handleInvertAllResized("invert(50%)") } },
      { name: "invert-25", func: () => { handleInvertAllResized("invert(25%)") } },
      { name: "invert-10", func: () => { handleInvertAllResized("invert(10%)") } },

      { name: "handleHueRotate270", func: () => { handleHueRotateAllResized("hue-rotate(300deg)") } },
      { name: "handleHueRotate180", func: () => { handleHueRotateAllResized("hue-rotate(250deg)") } },
      { name: "handleHueRotate90", func: () => { handleHueRotateAllResized("hue-rotate(200deg)") } },
      { name: "handleHueRotate270", func: () => { handleHueRotateAllResized("hue-rotate(180deg)") } },
      { name: "handleHueRotate180", func: () => { handleHueRotateAllResized("hue-rotate(150deg)") } },
      { name: "handleHueRotate90", func: () => { handleHueRotateAllResized("hue-rotate(130deg)") } },
      { name: "handleHueRotate270", func: () => { handleHueRotateAllResized("hue-rotate(100deg)") } },
      { name: "handleHueRotate180", func: () => { handleHueRotateAllResized("hue-rotate(80deg)") } },
      { name: "handleHueRotate90", func: () => { handleHueRotateAllResized("hue-rotate(60deg)") } },
      { name: "handleHueRotate270", func: () => { handleHueRotateAllResized("hue-rotate(40deg)") } },
      { name: "handleHueRotate180", func: () => { handleHueRotateAllResized("hue-rotate(20deg)") } },
      { name: "handleHueRotate90", func: () => { handleHueRotateAllResized("hue-rotate(10deg)") } },
      { name: "handleRotation_90°", func: handleRotationResized },
      { name: "handleReflection_180°", func: handleReflectionResized },
      { name: "handleSepia", func: () => { handleSepiaLevelResized(100) } },
      { name: "handleSepia", func: () => { handleSepiaLevelResized(75) } },
      { name: "handleSepia", func: () => { handleSepiaLevelResized(50) } },
      { name: "handleSepia", func: () => { handleSepiaLevelResized(25) } },
      { name: "handleBorder", func: handleBorderResized },
      

    ];

    const canvas = canvasRef.current;
    const link = document.createElement("a");
    document.body.appendChild(link);

    filters.reduce((promise, { name, func }) => {
      return promise.then(() => {
        return new Promise((resolve) => {
          func();
          setTimeout(() => {
            link.href = canvas.toDataURL();
            link.download = `${name}.png`;
            link.click();
            resolve();
          }, 100); // wait for canvas to update
        });
      });
    }, Promise.resolve());
  }




  function handleImageChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageSrc(reader.result);
    };
    setIsLoading(false);
  }

  function handleDownload() {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'image.png';
    link.href = canvas.toDataURL();
    link.click();
  }

  function handleGrayscale() {
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
  function handleGrayscaleResized() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = 230;
      canvas.height = 230;
      ctx.drawImage(img, 0, 0, 230, 230);
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

      const saturation = 2; //Ajusta este valor para cambiar la saturación
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const gray = (r + g + b) / 3;
        data[i] = gray + saturation * (r - gray);
        data[i + 1] = gray + saturation * (g - gray);
        data[i + 2] = gray + saturation * (b - gray);
      }
      ctx.putImageData(imageData, 0, 0);
    };
  }
  function handleSaturation(levelSaturate) {
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

      //Ajusta la saturación de cada píxel en la imagen.
      const saturation = levelSaturate; //Ajusta este valor para cambiar la saturación
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const gray = (r + g + b) / 3;
        data[i] = gray + saturation * (r - gray);
        data[i + 1] = gray + saturation * (g - gray);
        data[i + 2] = gray + saturation * (b - gray);
      }
      ctx.putImageData(imageData, 0, 0);
    };
  }
  function handleSaturationResized(levelSaturate) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = 230;
      canvas.height = 230;
      ctx.drawImage(img, 0, 0, 230, 230);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      //Ajusta la saturación de cada píxel en la imagen.
      const saturation = levelSaturate; //Ajusta este valor para cambiar la saturación
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const gray = (r + g + b) / 3;
        data[i] = gray + saturation * (r - gray);
        data[i + 1] = gray + saturation * (g - gray);
        data[i + 2] = gray + saturation * (b - gray);
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

  function handleContrast(contrast) {
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
      const factor = (259 * (contrast + 128)) / (255 * (259 - contrast)); // adjust factor as desired
      for (let i = 0; i < data.length; i += 4) {
        data[i] = factor * (data[i] - 128) + 128;
        data[i + 1] = factor * (data[i + 1] - 128) + 128;
        data[i + 2] = factor * (data[i + 2] - 128) + 128;
      }
      ctx.putImageData(imageData, 0, 0);
    };
  }
  function handleContrastResized(contrast) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = 230;
      canvas.height = 230;
      ctx.drawImage(img, 0, 0, 230, 230);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const factor = (259 * (contrast + 128)) / (255 * (259 - contrast)); // adjust factor as desired
      for (let i = 0; i < data.length; i += 4) {
        data[i] = factor * (data[i] - 128) + 128;
        data[i + 1] = factor * (data[i + 1] - 128) + 128;
        data[i + 2] = factor * (data[i + 2] - 128) + 128;
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
  function handleApplyBlurAll(distorsion) {
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const blurAmount = distorsion; // Adjust as desired
      ctx.filter = `blur(${blurAmount}px)`;
      ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
      ctx.filter = 'none';
      
    };

  }
  function handleApplyBlurAllResized(distorsion) {
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = 230;
      canvas.height = 230;
      ctx.drawImage(img, 0, 0, 230, 230);
      const blurAmount = distorsion; // Adjust as desired
      ctx.filter = `blur(${blurAmount}px)`;
      ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
      ctx.filter = 'none';
      
    };

  }

  function handleResize() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      // Determine the new size of the image
      const maxWidth = 800;
      const maxHeight = 600;
      const { width, height } = calculateAspectRatioFit(img.width, img.height, maxWidth, maxHeight);

      // Resize the canvas
      canvas.width = width;
      canvas.height = height;

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0, width, height);
    };

  }
  function handleResizeAll(width_ancho, height_alto) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      // Determine the new size of the image
      const maxWidth = width_ancho;
      const maxHeight = height_alto;
      const { width, height } = calculateAspectRatioFit(img.width, img.height, maxWidth, maxHeight);

      // Resize the canvas
      canvas.width = width;
      canvas.height = height;

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0, width, height);
    };

  }


  // Helper function to calculate aspect ratio
  function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }
  function handleOpacity(opacity) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.globalAlpha = 0.5; // set opacity level
      ctx.drawImage(img, 0, 0);
    };
  }
  function handleOpacityAll(opacity) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.globalAlpha = opacity; // set opacity level
      ctx.drawImage(img, 0, 0);
    };
  }
  function handleOpacityAllResized(opacity) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = 230;
      canvas.height = 230;
      ctx.globalAlpha = opacity; // set opacity level
      ctx.drawImage(img, 0, 0, 230, 230);    };
  }
  function handleMoreBrightness() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.filter = "brightness(150%)"; // set brightness level
      ctx.drawImage(img, 0, 0);
    };
  }
  function handleLessBrightness() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.filter = "brightness(50%)"; // set brightness level
      ctx.drawImage(img, 0, 0);
    };
  }
  function handleLessBrightnessAll(brightness) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.filter = brightness; // set brightness level
      ctx.drawImage(img, 0, 0);

    };
  }
  function handleLessBrightnessAllResized(brightness) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = 230;
      canvas.height = 230;
      ctx.filter = brightness; // set brightness level
      ctx.drawImage(img, 0, 0, 230, 230);
    };
  }
  function handleInvert() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.filter = "invert(100%)"; // invert the image
      ctx.drawImage(img, 0, 0);
    };
  }
  function handleInvertAll(invert) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.filter = invert; // invert the image
      ctx.drawImage(img, 0, 0);
    };
  }
  function handleInvertAllResized(invert) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = 230;
      canvas.height = 230;
      ctx.filter = invert; // invert the image
      ctx.drawImage(img, 0, 0, 230, 230);  
    };
  }
  function handleOriginal() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.filter = "hue-rotate(360deg)";
      ctx.drawImage(img, 0, 0);
    };
  }

  function handleHueRotateAll(hue_rotate) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.filter = hue_rotate;
      ctx.drawImage(img, 0, 0);
    };
  }
  function handleHueRotateAllResized(hue_rotate) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = 230;
      canvas.height = 230;
      ctx.filter = hue_rotate;
      ctx.drawImage(img, 0, 0, 230, 230); 
    };
  }

  function handleRotation() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.height;
      canvas.height = img.width;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((90 * Math.PI) / 180);
      ctx.translate(-canvas.height / 2, -canvas.width / 2);
      ctx.drawImage(img, 0, 0);
    };
  }
  function handleRotationResized() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = 230;
      canvas.height = 230;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((90 * Math.PI) / 180);
      ctx.translate(-canvas.height / 2, -canvas.width / 2);
      ctx.drawImage(img, 0, 0, 230, 230); 
    };
  }

  function handleReflection() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.scale(1, -1);
      ctx.drawImage(img, 0, -canvas.height);
    };
  }
  function handleReflectionResized() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = 230;
      canvas.height = 230;
      ctx.scale(1, -1);
      ctx.drawImage(img, 0, -canvas.height);
    };
  }
  function handleSepia() {
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
        data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
        data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
        data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
      }
      ctx.putImageData(imageData, 0, 0);
    };
  }
  function handleSepiaLevel(sepiaPercentage) {
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
      const level = sepiaPercentage / 100; // convert percentage to decimal
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        data[i] = Math.min(255, (r * (1 - (0.607 * level))) + (g * (0.769 * level)) + (b * (0.189 * level)));
        data[i + 1] = Math.min(255, (r * (0.349 * level)) + (g * (1 - (0.314 * level))) + (b * (0.168 * level)));
        data[i + 2] = Math.min(255, (r * (0.272 * level)) + (g * (0.534 * level)) + (b * (1 - (0.869 * level))));
      }
      ctx.putImageData(imageData, 0, 0);
    };
  }
  function handleSepiaLevelResized(sepiaPercentage) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = 230;
      canvas.height = 230;
      ctx.drawImage(img, 0, 0, 230, 230);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const level = sepiaPercentage / 100; // convert percentage to decimal
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        data[i] = Math.min(255, (r * (1 - (0.607 * level))) + (g * (0.769 * level)) + (b * (0.189 * level)));
        data[i + 1] = Math.min(255, (r * (0.349 * level)) + (g * (1 - (0.314 * level))) + (b * (0.168 * level)));
        data[i + 2] = Math.min(255, (r * (0.272 * level)) + (g * (0.534 * level)) + (b * (1 - (0.869 * level))));
      }
      ctx.putImageData(imageData, 0, 0);
    };
  }

  function handleBorder() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width + 20;
      canvas.height = img.height + 20;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 10, 10, img.width, img.height);
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 50;
      ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);
    };
  }
  function handleBorderResized() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = 210 + 20;
      canvas.height = 210 + 20;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 10, 10, 210, 210);
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 50;
      ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);
    };
  }
  function handleDropShadow() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width + 20;
      canvas.height = img.height + 20;
      ctx.shadowColor = '#D3D3D3';
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 50;
      ctx.shadowOffsetY = 30;
      ctx.drawImage(img, 0, 0, img.width, img.height, 10, 10, img.width, img.height);
    };
  }

  useEffect(() => {
    verifyIfIAm()
  });

  const verifyIfIAm = () => {
    if (namePerson === "DarkCainDs" && nameClan === "LonelyBastards") {
      setDownloadAll(true);
    }
    if (namePerson === "DarkCainDs" && nameClan === "DarkSlayers") {
      setDownloadAllResized(true);
    }
  }



  return (
    <div className='main-layer'>

      <div className='left'>
        <h1>Choose Filter </h1>
        <div className='square-container'>



          <button onClick={handleGrayscale}>Grayscale</button>
          <button onClick={handleIncreaseSaturation}>Aumentar saturación</button>
          <button onClick={handleLessDesaturate}>Desaturar</button>
          <button onClick={handleMoreContrast}>Más contrast</button>
          <button onClick={handleLessContrast}>Less contrast</button>
          <button onClick={handleApplyBlur}>Aplicar desenfoque</button>
          <button onClick={handleResize}>Redimenzionar</button>

          <button onClick={handleOpacity}>Less opacity</button>
          <button onClick={handleMoreBrightness}>Brightness</button>
          <button onClick={handleInvert}>InvertColor</button>
          <button onClick={handleLessBrightness}>Less brightness</button>

          <button onClick={handleOriginal}>Original</button>
          <button onClick={() => {handleHueRotateAll("hue-rotate(270deg)")}}>Hue-Rotate270</button>
          <button onClick={() => {handleHueRotateAll("hue-rotate(180deg)")}}>Hue-Rotate180</button>
          <button onClick={() => {handleHueRotateAll("hue-rotate(90deg)")}}>Hue-Rotate90</button>
          <button onClick={handleRotation}>Rotation_90°</button>
          <button onClick={handleReflection}>Reflection_180°</button>


          <button onClick={handleSepia}> Sepia</button>
          <button onClick={handleBorder}> Border</button>
          <button onClick={handleDropShadow}> DropShadow</button>

        </div>
      </div>


      <div className='right'>

        <div className='upload-square'>
          <h1>Upload Image</h1>

          {isLoading ?
            (<div style={{ color: "red", fontSize: "25px" }}><FiArrowUpCircle /><p>Choose your image to upload!!</p></div>)
            :
            (<div style={{ color: "green", fontSize: "35px" }}><FiArrowLeftCircle /><p>Press a Button !!</p></div>)}

          <input type="file" accept="image/*" onChange={handleImageChange} className="input-file" />
        </div>


        <div className='canvas-container'>
          <canvas ref={canvasRef} />

        </div>

        <div>

          <button className='download-button' onClick={handleDownload}>Download</button>
          {downloadAll && <button className='downloadAll-button' onClick={handleDownloadAll}>Download all</button>}
          {downloadAllResized && <button className='downloadAll-button' onClick={handleDownloadAllResized}>Download All Resized</button>}

          
        </div>


      </div>




    </div>
  );
}

export default ImageTransformer;
