export class Product {
    id: string;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
  
    constructor(data: any) {
      this.id = data.id;
      this.name = data.name;
      this.description = data.description;
      this.price = data.price.formatted_with_symbol;
      this.imageUrl = data.image.url;
    }
  }