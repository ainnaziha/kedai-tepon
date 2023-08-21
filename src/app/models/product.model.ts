import { Price } from "./price.model";

export class Product {
    id: string;
    name: string;
    description: string | null;
    price: Price;
    imageUrl: string | null;
    isLoading?: boolean;
  
    constructor(data: any) {
      this.id = data.id ?? data.product_id;
      this.name = data.name ?? data.product_name;
      this.description = data.description;
      this.price = new Price(data.price);
      this.imageUrl = data.image?.url;
    }
  }