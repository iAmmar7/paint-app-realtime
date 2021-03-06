import { useCallback, useRef, useState, useEffect } from 'react';

import constants from '../constants';

const usePainter = (socket) => {
  const canvas = useRef();
  const [isRegularMode, setIsRegularMode] = useState(true);
  const [isLineMode, setIsLineMode] = useState(false);
  const [isAutoWidth, setIsAutoWidth] = useState(false);
  const [isEraser, setIsEraser] = useState(false);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [currentWidth, setCurrentWidth] = useState(constants.brushSize);

  const autoWidth = useRef(false);
  const selectedSaturation = useRef(100);
  const selectedLightness = useRef(50);
  const selectedColor = useRef('#000000');
  const selectedLineWidth = useRef(constants.brushSize);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const hue = useRef(0);
  const isDrawing = useRef(false);
  const direction = useRef(true);
  const isRegularPaintMode = useRef(true);
  const isEraserMode = useRef(false);

  const ctx = useRef(canvas?.current?.getContext('2d'));

  // useEffect(() => {
  //   socket.on('canvas-data', (data) => {
  //     const image = new Image();
  //     const canvasCtx = canvas.current.getContext('2d');
  //     image.onload = () => canvasCtx.drawImage(image, 0, 0);
  //     image.src = data.image;
  //   });
  // }, [socket]);

  const drawOnCanvas = useCallback((event) => {
    if (!ctx || !ctx.current) {
      return;
    }
    ctx.current.beginPath();
    ctx.current.moveTo(lastX.current, lastY.current);
    ctx.current.lineTo(event.offsetX, event.offsetY);
    ctx.current.stroke();

    [lastX.current, lastY.current] = [event.offsetX, event.offsetY];
  }, []);

  const drawLine = useCallback((event) => {
    if (!ctx || !ctx.current) {
      return;
    }

    // Clear previous line
    ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);

    // Draw new line
    ctx.current.beginPath();
    ctx.current.moveTo(lastX.current, lastY.current);
    ctx.current.lineTo(event.offsetX, event.offsetY);
    ctx.current.stroke();
  }, []);

  const handleMouseDown = useCallback((e) => {
    isDrawing.current = true;
    [lastX.current, lastY.current] = [e.offsetX, e.offsetY];
  }, []);

  const dynamicLineWidth = useCallback(() => {
    if (!ctx || !ctx.current) {
      return;
    }
    if (ctx.current.lineWidth > 90 || ctx.current.lineWidth < 10) {
      direction.current = !direction.current;
    }
    direction.current ? ctx.current.lineWidth++ : ctx.current.lineWidth--;
    setCurrentWidth(ctx.current.lineWidth);
  }, []);

  const drawNormal = useCallback(
    (e) => {
      if (!isDrawing.current || !ctx.current) return;

      if (isRegularPaintMode.current || isEraserMode.current) {
        ctx.current.strokeStyle = selectedColor.current;

        setCurrentColor(selectedColor.current);

        autoWidth.current && !isEraserMode.current
          ? dynamicLineWidth()
          : (ctx.current.lineWidth = selectedLineWidth.current);

        isEraserMode.current
          ? (ctx.current.globalCompositeOperation = 'destination-out')
          : (ctx.current.globalCompositeOperation = 'source-over');
      } else {
        setCurrentColor(`hsl(${hue.current},${selectedSaturation.current}%,${selectedLightness.current}%)`);
        ctx.current.strokeStyle = `hsl(${hue.current},${selectedSaturation.current}%,${selectedLightness.current}%)`;
        ctx.current.globalCompositeOperation = 'source-over';

        hue.current++;

        if (hue.current >= 360) hue.current = 0;

        autoWidth.current ? dynamicLineWidth() : (ctx.current.lineWidth = selectedLineWidth.current);
      }

      if (isLineMode) {
        drawLine(e);
      } else {
        drawOnCanvas(e);
      }
    },
    [isLineMode, dynamicLineWidth, drawLine, drawOnCanvas]
  );

  const stopDrawing = useCallback(() => {
    isDrawing.current = false;

    // const image = canvas.current.toDataURL('image/png');
    // socket.emit('canvas-data', { image });
  }, [socket]);

  const init = useCallback(() => {
    ctx.current = canvas?.current?.getContext('2d');
    if (canvas && canvas.current && ctx && ctx.current) {
      canvas.current.addEventListener('mousedown', handleMouseDown);
      canvas.current.addEventListener('mousemove', drawNormal);
      canvas.current.addEventListener('mouseup', stopDrawing);
      canvas.current.addEventListener('mouseout', stopDrawing);

      canvas.current.width = window.innerWidth - 196;
      canvas.current.height = window.innerHeight;

      ctx.current.strokeStyle = '#000';
      ctx.current.lineJoin = 'round';
      ctx.current.lineCap = 'round';
      ctx.current.lineWidth = 10;
    }
  }, [drawNormal, handleMouseDown, stopDrawing]);

  const handleRegularMode = useCallback(() => {
    setIsRegularMode(true);
    isEraserMode.current = false;
    setIsEraser(false);
    isRegularPaintMode.current = true;
  }, []);

  const handleSpecialMode = useCallback(() => {
    setIsRegularMode(false);
    isEraserMode.current = false;
    setIsEraser(false);
    isRegularPaintMode.current = false;
  }, []);

  const handleColor = (e) => {
    setCurrentColor(e.currentTarget.value);
    selectedColor.current = e.currentTarget.value;
  };

  const handleWidth = (e) => {
    setCurrentWidth(e.currentTarget.value);
    selectedLineWidth.current = e.currentTarget.value;
  };

  // const clearCanvas = useCallback(() => {
  //   if (!ctx || !ctx.current || !canvas || !canvas.current) {
  //     return;
  //   }
  //   ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
  // }, []);

  const handleEraserMode = (e) => {
    autoWidth.current = false;
    setIsAutoWidth(false);
    setIsRegularMode(true);
    isEraserMode.current = true;
    setIsEraser(true);
  };

  const setCurrentSaturation = (e) => {
    setCurrentColor(`hsl(${hue.current},${e.currentTarget.value}%,${selectedLightness.current}%)`);
    selectedSaturation.current = e.currentTarget.value;
  };

  const setCurrentLightness = (e) => {
    setCurrentColor(`hsl(${hue.current},${selectedSaturation.current}%,${e.currentTarget.value}%)`);
    selectedLightness.current = e.currentTarget.value;
  };

  const setAutoWidth = (e) => {
    autoWidth.current = e.currentTarget.checked;
    setIsAutoWidth(e.currentTarget.checked);

    if (!e.currentTarget.checked) {
      setCurrentWidth(selectedLineWidth.current);
    } else {
      setCurrentWidth(ctx?.current?.lineWidth ?? selectedLineWidth.current);
    }
  };

  return [
    {
      canvas,
      ctx,
      currentWidth,
      currentColor,
      isRegularMode,
      isAutoWidth,
      isEraser,
    },
    {
      init,
      handleRegularMode,
      handleSpecialMode,
      handleColor,
      handleWidth,
      // handleClear,
      handleEraserMode,
      setAutoWidth,
      setCurrentSaturation,
      setCurrentLightness,
    },
  ];
};

export default usePainter;
