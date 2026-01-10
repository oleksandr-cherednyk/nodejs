// Homework 19

// Task 1:
const sumEvenNumbers = (numbers: number[]): number =>
  numbers.reduce((sum, value) => (value % 2 === 0 ? sum + value : sum), 0);

// Task 2:
interface StringToBooleanFunction {
  (value: string): boolean;
}

const isEmptyString: StringToBooleanFunction = (value) => value.length === 0;

// Task 3:
type CompareStrings = (first: string, second: string) => boolean;

const areStringsEqual: CompareStrings = (first, second) => first === second;

// Task 4:
function getLastElement<T>(items: T[]): T | undefined {
  return items[items.length - 1];
}

// Task 5:
function makeTriple<T>(first: T, second: T, third: T): T[] {
  return [first, second, third];
}

// Example usage
console.log(sumEvenNumbers([1, 2, 3, 4, 5]));
console.log(isEmptyString(""));
console.log(areStringsEqual("hi", "hi"));
console.log(getLastElement(["a", "b", "c"]));
console.log(makeTriple(1, 2, 3));
