require('dotenv').config();
const process = require('process');
const app = require('express')();
const http = require('http').createServer(app);
const redisAdapter = require('socket.io-redis');
// const io = require('socket.io')(http, {
//   cors: {
//     origin: '*',
//   },
//   transports: ['websocket'],
// });

global.io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: false,
  },
  transports: ['websocket', 'polling'],
  allowEIO3: true,
});

const PORT = process.env.PORT || 5000;

io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));

global.io.on('connection', (socket) => {
  console.log(`User connected on process ${process.pid}`);

  socket.on('canvas-data', (data) => {
    console.log('sending data', process.pid);
    socket.broadcast.emit('canvas-data', { data: data.data, id: process.pid });
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected from process ${process.pid}`);
  });
});

http.listen(PORT, () => {
  console.log(`Listening all instances on port: ${PORT}`);
  console.log(`Current instance id: ${process.pid}`);
});
