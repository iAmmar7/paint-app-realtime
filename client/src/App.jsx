import { useState, useEffect } from 'react';
import socketClient from 'socket.io-client';

import Canvas from './components/Canvas';

const URL = `ws://paint-app-realtime-v2.vercel.app:5001/socket.io/?EIO=4&transport=websocket`;

const socket = socketClient(URL, {
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
