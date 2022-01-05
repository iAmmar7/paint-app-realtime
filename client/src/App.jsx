import { useState, useEffect } from 'react';
import socketClient from 'socket.io-client';

import Canvas from './components/Canvas';

const URL =
  process.env.REACT_APP_NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_SERVER_URL
    : process.env.REACT_APP_DEV_SERVER_URL;

const socket = socketClient(URL || 'https://fierce-fortress-85118.herokuapp.com/', {
  transports: ['websocket', 'polling'],
});

const App = () => {
  const [elements, setElements] = useState({ currentState: [], previousState: [] });

  useEffect(() => {
    socket.on('canvas-data', (data) => {
      console.log('Socket data from', data.id);
      setElements(data.data);
    });
  }, []);

  const emitCanvasData = (data) => {
    socket.emit('canvas-data', { data });
  };

  return <Canvas data={elements} emitCanvasData={emitCanvasData} />;
};

export default App;
