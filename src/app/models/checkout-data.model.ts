import { Price } from "./price.model";
import { Product } from "./product.model";

export class CheckoutData {
    id: string;
    cartId: string;
    total: Price;

    constructor(data: any) {
      this.id = data.id;
      this.cartId = data.cart_id;
      this.total = new Price(data.total);
    }
}