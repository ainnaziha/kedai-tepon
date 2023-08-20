export class Price {
    raw: number;
    formatted: string;
    formattedWithSymbol: string;
    formattedWithCode: string;
  
    constructor(data: any) {
      this.raw = data.raw;
      this.formatted = data.formatted;
      this.formattedWithSymbol = data.formatted_with_symbol;
      this.formattedWithCode = data.formatted_with_code;
    }
}