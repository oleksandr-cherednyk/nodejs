// Homework 17

// Task 1:
function calculateTotal(price: number, quantity: number, discount: number = 0): number {
  const total = price * quantity;
  return total - total * (discount / 100);
}

// Task 2:
let id: string | number;

function displayId(value: string | number): void {
  if (typeof value === "string") {
    console.log(`ID: ${value.toUpperCase()}`);
  } else {
    console.log(`ID: ${value * 10}`);
  }
}

// Task 3:
type OrderStatus = "pending" | "shipped" | "delivered";

type Order = {
  orderId: string;
  amount: number;
  status: OrderStatus;
};

const orders: Order[] = [
  { orderId: "A100", amount: 120, status: "pending" },
  { orderId: "A101", amount: 200, status: "shipped" },
  { orderId: "A102", amount: 80, status: "delivered" },
  { orderId: "A103", amount: 150, status: "pending" },
];

function filterOrdersByStatus(list: Order[], status: OrderStatus): Order[] {
  return list.filter((order) => order.status === status);
}

// Task 4:
const productInfo: [string, number, number] = ["Coffee", 15, 5];

type Inventory = Record<string, number>;

function updateStock(inventory: Inventory, product: [string, number, number]): Inventory {
  const [name, _price, delta] = product;
  const current = inventory[name] ?? 0;
  return {
    ...inventory,
    [name]: current + delta,
  };
}

// Example usage
id = "abc12345";
displayId(id);

displayId(7);

console.log(calculateTotal(10, 3));


console.log(filterOrdersByStatus(orders, "pending"));

const inventory: Inventory = { Coffee: 10 };
console.log(updateStock(inventory, productInfo));
