import { useEffect, useState } from 'react';

const Canvas = ({ canvasRef, width }) => {
  const [dragged, setDragged] = useState(false);

  const widthHalf = width ? width / 2 : 0;
  const cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23000000" opacity="0.3" height="${width}" viewBox="0 0 ${width} ${width}" width="${width}"><circle cx="${widthHalf}" cy="${widthHalf}" r="${widthHalf}" fill="%23000000" /></svg>') ${widthHalf} ${widthHalf}, auto`;

  useEffect(() => {
    let dragStart = false;
    const eventListener = canvasRef.current;
    eventListener.addEventListener('mousedown', () => {
      setDragged(false);
      dragStart = false;
    });
    eventListener.addEventListener('mousemove', () => {
      dragStart = true;
    });
    eventListener.addEventListener('mouseup', () => {
      if (dragStart) {
        setDragged(true);
        dragStart = false;
      }
    });

    return () => {
      eventListener.removeEventListener('mousedown', null);
      eventListener.removeEventListener('mousemove', null);
      eventListener.removeEventListener('mouseup', null);
    };
  }, [canvasRef]);

  useEffect(() => {
    if (dragged) {
      console.log('Hit the API');
    }
  }, [dragged]);

  return (
    <section>
      <canvas style={{ cursor }} ref={canvasRef} />
    </section>
  );
};

export default Canvas;
