import { Price } from "./price.model";

export class Order {
    id: string;
    customerReference: string;
    customerName: string;
    total: Price;

    constructor(data: any) {
      this.id = data.id;
      this.customerReference = data.customer_reference;
      this.customerName = data.customer.firstname;
      this.total = new Price(data.order.total);
    }
}