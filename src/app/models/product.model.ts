import { Category } from "./category.model";

export class Product {
  id: number;
  name: string;
  description: string;
  image: string;
  formattedPrice: string;
  category: Category | null;
  isLoading?: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.image = `assets/${data.image}`;
    this.formattedPrice = data.formattedPrice;
    this.category = data.categroy == null ? null : new Category(data.category);

  }
}