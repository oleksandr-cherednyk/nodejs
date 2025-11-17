const fs = require('fs');

function logMessage(message) {
  fs.appendFile('logger.txt', message + '\n', (err) => {
    if (err) {
      console.error('Ошибка записи в лог:', err);
    }
  });
}

module.exports = { logMessage };
