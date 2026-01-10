export interface Person {
  firstName: string;
  lastName: string;
}

export interface Student extends Person {
  grade: number;
}

export const student: Student = {
  firstName: "Maria",
  lastName: "Sidorova",
  grade: 5,
};

export const printStudentInfo = (value: Student): void => {
  console.log(`${value.firstName} ${value.lastName}, grade: ${value.grade}`);
};
