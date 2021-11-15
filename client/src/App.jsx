import { useState, useEffect, useCallback } from 'react';
import socketClient from 'socket.io-client';

import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
import usePainter from './hooks/usePainter';

const URL =
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_SERVER_URL : process.env.REACT_APP_DEV_SERVER_URL;
const socket = socketClient(URL);

const App = () => {
  const [dateUrl, setDataUrl] = useState('#');
  const [{ canvas, canvasToRef, ctx, ...state }, { init, ...api }] = usePainter(socket);

  useEffect(() => {
    init();
  }, [init]);

  const onCanvasData = () => {
    socket.on('canvas-data', (data) => {
      const image = new Image();
      const canvasCtx = canvas.current.getContext('2d');
      image.onload = () => canvasCtx.drawImage(image, 0, 0);
      image.src = data.image;
    });
  };

  const emitCanvasData = () => {
    const image = canvas.current.toDataURL('image/png');
    socket.emit('canvas-data', { image });
  };

  const handleDownload = useCallback(() => {
    if (!canvas || !canvas.current) return;

    setDataUrl(canvas.current.toDataURL('image/png'));
  }, [canvas]);

  const handleClear = useCallback(() => {
    if (!ctx || !ctx.current || !canvas || !canvas.current) {
      return;
    }
    ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);

    // console.log('ctx', ctx.current.canvas, canvas.current);

    // setTimeout(() => {
    //   const image = ctx.current.canvas.toDataURL('image/png');
    //   socket.emit('canvas-data', { image });
    // }, 2000);
  }, [canvas, ctx]);

  const toolbarProps = { ...state, ...api, dateUrl, handleDownload, handleClear };

  return (
    <>
      <Toolbar {...toolbarProps} />
      <Canvas
        width={state.currentWidth}
        canvasRef={canvas}
        canvasToRef={canvasToRef}
        onCanvasData={onCanvasData}
        emitCanvasData={emitCanvasData}
      />
    </>
  );
};

export default App;
