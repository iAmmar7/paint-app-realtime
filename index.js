require('dotenv').config();
const process = require('process');
const path = require('path');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
  transports: ['websocket', 'polling'],
});

const PORT = process.env.PORT || 5000;

io.on('connection', (socket) => {
  console.log(`User connected on process ${process.pid}`);

  socket.on('canvas-data', (data) => {
    console.log('sending data', process.pid);
    socket.broadcast.emit('canvas-data', { data: data.data, id: process.pid });
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected from process ${process.pid}`);
  });
});

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'client', 'build')));

//   app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
//   });
// }

app.get('/', (req, res) => {
  res.send('Server running!');
});

server.listen(PORT, () => {
  console.log(`Listening all instances on port: ${PORT}`);
  console.log(`Current instance id: ${process.pid}`);
});
