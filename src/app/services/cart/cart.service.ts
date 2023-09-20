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
    this.isLoading = true;
    this.httpService.get('cart').subscribe(
      (r) => {
        if (r['data'] != null) {
          this.cart = new Cart(r['data']);
          this.cartTotal = this.cart.items.length;
        }

        this.isLoading = false;
      },
      (e) => {
        this.isLoading = false;
        this.errorDialogService.openDialog(e.error.message);
      }
    );
  }

  async addToCart(productId: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
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
    });
  }

  async updateCart(cartId: number, quantity: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.httpService.put('cart/update', {'cartId': cartId, 'quantity': quantity}).subscribe(
        (r) => {
          if (r['data'] != null) {
            this.cart = new Cart(r['data']);
            this.cartTotal = this.cart.items.length;
            resolve();
          }
        },
        (e) => {
          this.errorDialogService.openDialog(e.error.message);
          reject(e);
        }
      );
    });
  }

  async deleteCart(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.httpService.delete('cart/delete').subscribe(
        (r) => {
          if (r['data'] != null) {
            this.cart = new Cart({});
            this.cartTotal = 0;
          }
        },
        (e) => {
          this.errorDialogService.openDialog(e.error.message);
        }
      );
    });
  }

  clear() {
    this.cart = new Cart({});
  }
}