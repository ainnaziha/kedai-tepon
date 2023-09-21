export class Checkout {
  id: number;
  orderNo: string;
  invoiceNo: string;
  total: string;
  name: string;
  email: string;
  street: string;
  town: string;
  cartIds: number[];

  constructor(data: any) {
    this.id = data.id;
    this.orderNo = data.orderNo;
    this.invoiceNo = data.invoiceNo ?? '';
    this.total = data.total ?? '';
    this.name = data.name ?? '';
    this.email = data.email ?? '';
    this.town = data.town ?? '';
    this.street = data.street ?? '';
    this.cartIds = [];
  }
}