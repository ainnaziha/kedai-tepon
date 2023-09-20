export class CheckoutData {
    id: string;
    cartId: string;
    total: number;
    shippingMethod: string;

    constructor(data: any) {
      this.id = data.id;
      this.cartId = data.cart_id;
      this.total = 0;
      this.shippingMethod = data.shipping_methods[0].id;
    }
}