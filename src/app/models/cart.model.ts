import { Price } from "./price.model";
import { Product } from "./product.model";

export class CartItem {
    id: string;
    product: Product;
    quantity: number;
    lineTotal: Price;
    isEditing?: boolean;
    newQuantity?: number;
    isLoading?: boolean;
    isDeleting?: boolean;

    constructor(data: any) {
      this.id = data.id;
      this.product = new Product(data);
      this.quantity = data.quantity;
      this.lineTotal = new Price(data.line_total);
    }
}