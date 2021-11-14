import { useState, useEffect, useCallback } from 'react';

import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
import usePainter from './hooks/usePainter';

const App = () => {
  const [dateUrl, setDataUrl] = useState('#');
  const [{ canvas, ...state }, { init, ...api }] = usePainter();

  useEffect(() => {
    init();
  }, [init]);

  const handleDownload = useCallback(() => {
    if (!canvas || !canvas.current) return;

    setDataUrl(canvas.current.toDataURL('image/png'));
  }, [canvas]);

  const toolbarProps = { ...state, ...api, dateUrl, handleDownload };

  return (
    <>
      <Toolbar {...toolbarProps} />
      <Canvas width={state.currentWidth} canvasRef={canvas} />
    </>
  );
};

export default App;
