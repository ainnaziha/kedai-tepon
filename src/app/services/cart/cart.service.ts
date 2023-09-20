import { Injectable } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { CustomDialogService } from '../custom-dialog/custom-dialog.service';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartTotal: number = 0;
  public cart: Cart = new Cart({});

  isLoading: boolean = false;
  isDeleting: boolean = false;

  constructor(
    private customDialogService: CustomDialogService,
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
        this.customDialogService.openErrorDialog(e.error.message);
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
        this.customDialogService.openErrorDialog(e.error.message);
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
            resolve();
          }
        },
        (e) => {
          this.customDialogService.openErrorDialog(e.error.message);
          reject(e);
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
          this.customDialogService.openErrorDialog(e.error.message);
          reject(e);
        }
      );
    });
  }

  async deleteCart(): Promise<void> {
    this.isDeleting = true;
    this.httpService.delete('cart/delete').subscribe(
      (r) => {
        if (r['data'] != null) {
          this.cart = new Cart({});
          this.cartTotal = 0;
        }
        this.isDeleting = false;
      },
      (e) => {
        this.isDeleting = false;
        this.customDialogService.openErrorDialog(e.error.message);
      }
    );
  }

  clear() {
    this.cart = new Cart({});
  }
}