import { Price } from "./price.model";
import { Product } from "./product.model";

export class CheckoutData {
    id: string;
    cartId: string;
    total: Price;
    shippingMethod: string;

    constructor(data: any) {
      this.id = data.id;
      this.cartId = data.cart_id;
      this.total = new Price(data.total);
      this.shippingMethod = data.shipping_methods[0].id;
    }
}