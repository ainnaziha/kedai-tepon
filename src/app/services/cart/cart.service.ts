import { Injectable } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { ErrorDialogService } from '../error-dialog/error-dialog.service';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartTotal: number = 0;
  public cart: Cart = new Cart({});

  isLoading: boolean = false;

  constructor(
    private errorDialogService: ErrorDialogService,
    private httpService: HttpService,
  ) {}

  async getTotalCart() {
    this.httpService.get('cart/total').subscribe(
      (r) => {
        if (r['data'] != null) {
          this.cartTotal = r['data'];
        }
      },
      (e) => {
        this.errorDialogService.openDialog(e.error.message);
      }
    );
  }

  async getCart() {
    this.httpService.get('cart').subscribe(
      (r) => {
        console.log(r);
        if (r['data'] != null) {
          this.cart = new Cart(r['data']);
          this.cartTotal = this.cart.items.length;
        }
      },
      (e) => {
        this.errorDialogService.openDialog(e.error.message);
      }
    );
  }

  async addToCart(productId: number): Promise<void> {
    this.httpService.post('cart/add', {'productId': productId}).subscribe(
      (r) => {
        if (r['data'] != null) {
          this.cart = new Cart(r['data']);
          this.cartTotal = this.cart.items.length;
        }
      },
      (e) => {
        this.errorDialogService.openDialog(e.error.message);
      }
    );
  }


  clear() {
    this.cart = null;
  }

  // async updateCart(id: string, quantity: number): Promise<void> {
  //   const index = this.cartItems.findIndex(item => item.id === id);

  //   await this.commerceService.commerce.cart.update(id, { quantity: quantity}).then(async (cart) => {
  //     this.cartItems = await Promise.all(cart.line_items.map(async item => {
  //       return new CartItem(item);
  //     }));
  //     this.cart = cart;
  //   });  
  // }

  // async deleteCart(id: string): Promise<void> {
  //   const index = this.cartItems.findIndex(item => item.id === id);

  //   await this.commerceService.commerce.cart.remove(id).then(async (cart) => {
  //     this.cartItems = await Promise.all(cart.line_items.map(async item => {
  //       return new CartItem(item);
  //     }));
  //     this.cart = cart;
  //   });  
  // }
}