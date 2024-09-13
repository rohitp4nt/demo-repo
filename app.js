const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const path=require('path')
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname, 'public', 'meet.html'));
})

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle signaling data
  socket.on('offer', (data) => {
    socket.broadcast.emit('offer', data); // Send offer to the other peer
  });

  socket.on('answer', (data) => {
    socket.broadcast.emit('answer', data); // Send answer to the other peer
  });

  socket.on('ice-candidate', (data) => {
    socket.broadcast.emit('ice-candidate', data); // Send ICE candidate
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
 