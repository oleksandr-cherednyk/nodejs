const fs = require("fs");
require("dotenv").config();

const filename = process.env.FILENAME;
if (filename) {
  fs.writeFile(filename, "Текст для примера!", () => {
    console.log("Файл создан!");

    fs.readFile(filename, "utf8", (err, data) => {
      console.log(data);
    });
  });
} else {
  console.log("Нет переменной с именем файла!")
}
