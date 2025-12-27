import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('Новый пользователь подключился:', socket.id);

  socket.on('chat message', (msg) => {
    console.log('Получено сообщение от', socket.id + ':', msg);

    socket.emit('message confirmation', {
      text: msg,
      timestamp: new Date().toLocaleTimeString(),
      id: socket.id
    });

    socket.broadcast.emit('chat message', {
      text: msg,
      timestamp: new Date().toLocaleTimeString(),
      id: socket.id
    });
  });

  socket.on('disconnect', () => {
    console.log('Пользователь отключился:', socket.id);
  });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
