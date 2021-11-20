require('dotenv').config();
const process = require('process');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`User connected on process ${process.pid}`);

  socket.on('canvas-data', (data) => {
    socket.broadcast.emit('canvas-data', data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected from process ${process.pid}`);
  });
});

const PORT = process.env.PORT || 5000;

http.listen(PORT, () => {
  console.log(`Listening all instances on port: ${PORT}`);
  console.log(`Current instance id: ${process.pid}`);
});
