import { adminUser } from "./task1-admin-user";
import { car, printCarInfo } from "./task2-car";
import { calculateDiscount } from "./task3-discount";
import { employees, getSalaries } from "./task4-employees";
import { printStudentInfo, student } from "./task5-student";
import { concatStrings } from "./task6-concat";

console.log(adminUser);
printCarInfo(car);
console.log(calculateDiscount({ name: "Phone", price: 1000 }, 10));
console.log(getSalaries(employees));
printStudentInfo(student);
console.log(concatStrings("Hello, ", "world!"));
