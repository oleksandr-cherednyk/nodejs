export type Car = {
  make: string;
  model: string;
  engine: {
    type: string;
    horsepower: number;
  };
  year?: number;
};

export const car: Car = {
  make: "Toyota",
  model: "Camry",
  engine: {
    type: "gasoline",
    horsepower: 200,
  },
  year: 2020,
};

export const printCarInfo = (value: Car): void => {
  const yearInfo = value.year ? `, year: ${value.year}` : "";
  console.log(
    `Car: ${value.make} ${value.model}, engine: ${value.engine.type} (${value.engine.horsepower} hp)${yearInfo}`
  );
};
