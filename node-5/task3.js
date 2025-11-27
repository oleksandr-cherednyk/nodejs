import http from 'http';

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.method === 'PUT') {
    res.statusCode = 200;
    res.end('PUT-запрос обработан');
  } else if (req.method === 'DELETE') {
    res.statusCode = 200;
    res.end('DELETE-запрос обработан');
  } else {
    res.statusCode = 405;
    res.end('Метод не поддерживается');
  }
});

server.listen(PORT, () => {
  console.log(
    `Server  is running on port:${PORT}`
  );
});
