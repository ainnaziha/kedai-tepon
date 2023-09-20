import { Category } from "./category.model";

export class Product {
  id: number;
  name: string;
  description: string;
  image: string;
  formattedPrice: string;
  category: Category;
  isLoading?: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.image = `assets/${data.image}`;
    this.formattedPrice = data.formattedPrice;
    this.category = new Category(data.category);

  }
}