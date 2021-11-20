import { useState, useEffect } from 'react';
import socketClient from 'socket.io-client';

import Canvas from './components/Canvas';

const URL =
  process.env.REACT_APP_NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_SERVER_URL
    : process.env.REACT_APP_DEV_SERVER_URL;
const socket = socketClient(URL);

console.log('URL', URL);

const App = () => {
  const [elements, setElements] = useState({ currentState: [], previousState: [] });

  useEffect(() => {
    socket.on('canvas-data', ({ data }) => {
      setElements(data);
    });
  }, []);

  const emitCanvasData = (data) => {
    socket.emit('canvas-data', { data });
  };

  return <Canvas data={elements} emitCanvasData={emitCanvasData} />;
};

export default App;
