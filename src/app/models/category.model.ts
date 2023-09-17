export class Category {
    id: number;
    name: string;
  
    constructor(data: any) {
      this.id = data.categoryId;
      this.name = data.categoryName;
    }
  }