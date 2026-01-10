// Task 1: Greeting function
function greetUser(name: string): void {
  console.log(`Hello, ${name}!`);
}

// Task 2: Object-typed parameter
interface Person {
  name: string;
  age: number;
  city: string;
}

function printPersonInfo(person: Person): void {
  console.log(`Name: ${person.name}, Age: ${person.age}, City: ${person.city}`);
}

// Task 3: Number parameter, return square
function squareNumber(value: number): number {
  return value * value;
}

// Task 4: Boolean return for even check
function isEven(value: number): boolean {
  return value % 2 === 0;
}

// Task 5: Student interface and printing
interface Student {
  name: string;
  grade: number;
}

function printStudentInfo(student: Student): void {
  console.log(`Student: ${student.name}, Grade: ${student.grade}`);
}

// Task 6: void return function
function logMessage(message: string): void {
  console.log(message);
}

// Example calls
const userName = "Alex";
const person: Person = { name: "Mary", age: 28, city: "Chicago" };
const student: Student = { name: "Ethan", grade: 5 };

greetUser(userName);
printPersonInfo(person);
console.log(`Square of 7: ${squareNumber(7)}`);
console.log(`Is 10 even: ${isEven(10)}`);
printStudentInfo(student);
logMessage("The message was logged to the console.");
