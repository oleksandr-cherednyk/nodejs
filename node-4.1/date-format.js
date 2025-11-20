const moment = require("moment");

// Текущая дата и время
const now = moment();

// Форматы по заданию
const year = now.format("DD-MM-YYYY"); // День-месяц-год
const month = now.format("MMM Do YY");  // Краткий месяц, день с суффиксом, год
const day = now.format("dddd");       // День недели

console.log("DD-MM-YYYY:", year);
console.log("MMM Do YY:", month);
console.log("Day:", day);
