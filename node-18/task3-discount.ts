export type Product = {
  name: string;
  price: number;
};

export interface CalculateDiscount {
  (product: Product, discount: number): number;
}

export const calculateDiscount: CalculateDiscount = (product, discount) => {
  return product.price - product.price * (discount / 100);
};
