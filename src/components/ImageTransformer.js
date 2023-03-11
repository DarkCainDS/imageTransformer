import React, { useState, useRef, useEffect } from 'react';

function ImageTransformer({ name2, clan2 }) {

  const [imageSrc, setImageSrc] = useState('');
  const canvasRef = useRef(null);
  const [namePerson, setNamePerson] = useState(name2);
  const [nameClan, setNameClan] = useState(clan2);
  const [isVerify, setIsVerify] = useState(false)

  function handleDownloadAll() {
    const filters = [
      { name: "grayscale", func: handleGrayscale },
      { name: "increase-saturation", func: handleIncreaseSaturation },
      { name: "less-desaturate", func: handleLessDesaturate },
      { name: "more-contrast", func: handleMoreContrast },
      { name: "less-contrast", func: handleLessContrast },
      { name: "apply-blur", func: handleApplyBlur },
      { name: "resizeTo_800x450", func: handleResize },
      { name: "opacity", func: handleOpacity },
      { name: "handleMoreBrightness", func: handleMoreBrightness },
      { name: "handleLessBrightness", func: handleLessBrightness },
      { name: "invert", func: handleInvert },
      { name: "Original", func: handleHueRotate360 },
      { name: "handleHueRotate270", func: handleHueRotate270 },
      { name: "handleHueRotate180", func: handleHueRotate180 },
      { name: "handleHueRotate90", func: handleHueRotate90 },
      { name: "handleRotation_90°", func: handleRotation },
      { name: "handleReflection_180°", func: handleReflection },
      { name: "handleSepia", func: handleSepia },
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



  function handleImageChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageSrc(reader.result);
    };
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

  // Helper function to calculate aspect ratio
  function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }
  function handleOpacity() {
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
  function handleHueRotate360() {
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
  function handleHueRotate270() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.filter = "hue-rotate(270deg)";
      ctx.drawImage(img, 0, 0);
    };
  }
  function handleHueRotate180() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.filter = "hue-rotate(180deg)";
      ctx.drawImage(img, 0, 0);
    };
  }
  function handleHueRotate90() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.filter = "hue-rotate(90deg)";
      ctx.drawImage(img, 0, 0);
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
      setIsVerify(true);
    }
  }



  return (
    <div className='main-layer'>
      
      <div className='square-container'>

        

        <button className='BlackAndWhite' onClick={handleGrayscale}>Convertir a escala de grises</button>
        <button className='MoreSaturate' onClick={handleIncreaseSaturation}>Aumentar saturación</button>
        <button className='LessSaturate' onClick={handleLessDesaturate}>Desaturar</button>
        <button onClick={handleMoreContrast}>Más contraste</button>
        <button onClick={handleLessContrast}>Menos contraste</button>
        <button onClick={handleApplyBlur}>Aplicar desenfoque</button>
        <button onClick={handleResize}>Resize Image</button>

        <button onClick={handleOpacity}>handleOpacity</button>
        <button onClick={handleMoreBrightness}>handleBrightness</button>
        <button onClick={handleInvert}> handleInvert</button>
        <button onClick={handleLessBrightness}>handleLessBrightness</button>

        <button onClick={handleHueRotate360}>Original</button>
        <button onClick={handleHueRotate270}>handleHueRotate270</button>
        <button onClick={handleHueRotate180}>handleHueRotate180</button>
        <button onClick={handleHueRotate90}>handleHueRotate90</button>
        <button onClick={handleRotation}>handleRotation_90°</button>
        <button onClick={handleReflection}> handleReflection_180°</button>


        <button onClick={handleSepia}> handleSepia</button>
        <button onClick={handleBorder}> handleBorder</button>
        <button onClick={handleDropShadow}> handleDropShadow</button>

      </div>
      
      <div className='right'>
      <input type="file" accept="image/*" onChange={handleImageChange} />
        <div className='canvas-container'>
          <canvas ref={canvasRef} />

        </div>


        <button onClick={handleDownload}>Descargar</button>


        {isVerify && <button onClick={handleDownloadAll}>Download all</button>}
      </div>




    </div>
  );
}

export default ImageTransformer;
