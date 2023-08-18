import { Injectable } from '@angular/core';
import Commerce from '@chec/commerce.js';

@Injectable({
  providedIn: 'root'
})
export class CommerceService {

  public commerce: Commerce;

  constructor() {
    this.commerce = new Commerce('pk_test_537353a87d16b50e31fcc40be09492969601d2caa8135', true);
  }

  async getUserCart(userId: string): Promise<any> {
    console.log("hererere 1");
    try {
      const cart = await this.commerce.cart.retrieve(userId);
      console.log("hererere");
      console.log(cart);
      return cart;
    } catch (error) {
      console.log("hererere 2");

      if (error.statusCode === 404) {
        const newCart = await this.commerce.cart.create(userId);
        console.log(newCart);
        return newCart;
      }
      return null;
    }
  }
}
