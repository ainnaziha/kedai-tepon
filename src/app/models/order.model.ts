export class Order {
    id: string;
    customerReference: string;
    customerName: string;
    total: number;

    constructor(data: any) {
      this.id = data.id;
      this.customerReference = data.customer_reference;
      this.customerName = data.customer.firstname;
      this.total = 0;
    }
}