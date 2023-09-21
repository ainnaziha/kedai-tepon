import { Product } from "./product.model";

export class Cart {
  total: string;
  totalFormatted: string;
  items: CartItem[];

  constructor(data: any) {
    this.total = data.total ?? '0.00';
    this.totalFormatted = data.totalFormatted ?? 'RM 0.00';
    this.items = data.items == null ? [] : data.items.map((item) => new CartItem(item));
  }

  getItemIds(): number[] {
    return this.items.map((item) => item.id);
  }
}
export class CartItem {
  id: number;
  product: Product;
  quantity: number;
  subtotal: string;
  isEditing?: boolean;
  newQuantity?: number;
  isLoading?: boolean;
  isDeleting?: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.product = new Product(data.product);
    this.quantity = data.quantity;
    this.subtotal = data.subtotal;
  }
}