import http from "http";
import fs from "fs";

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Проверка чтобы убрать двойную запись об ошибки (убрать запрос из браузера)
  if (req.url === "/favicon.ico") {
    res.statusCode = 204;
    return res.end();
  }

  try {
    throw new Error("Test error");
  } catch (error) {
    fs.appendFile("errors.log", error.message + "\n", () => {});

    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    res.end("Internal Server Error");
  }
});

server.listen(PORT, () => {
  console.log(`Server  is running on port:${PORT}`);
});
