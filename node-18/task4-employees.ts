export interface Employee {
  name: string;
  salary: number;
}

export const employees: Employee[] = [
  { name: "Anna", salary: 1200 },
  { name: "Pavel", salary: 1500 },
  { name: "Olga", salary: 1800 },
];

export const getSalaries = (list: Employee[]): number[] => {
  return list.map((item) => item.salary);
};
