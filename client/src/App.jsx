import { useState, useEffect } from 'react';
import socketClient from 'socket.io-client';

import CanvasV2 from './components/CanvasV2';

const URL =
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_SERVER_URL : process.env.REACT_APP_DEV_SERVER_URL;
const socket = socketClient(URL);

const App = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    socket.on('canvas-data', ({ data }) => {
      console.log('recieved', data);
      setElements(data);
    });
  }, []);

  const emitCanvasData = (data) => {
    socket.emit('canvas-data', { data });
  };

  return <CanvasV2 socketElements={elements || []} emitCanvasData={emitCanvasData} />;
};

export default App;
