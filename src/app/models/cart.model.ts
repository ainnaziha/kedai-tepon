import { Product } from "./product.model";

export interface CartItem {
    id: String;
    product: Product;
    quantity: number;
  }