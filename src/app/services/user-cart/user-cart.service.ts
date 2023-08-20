import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserCartService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  async getCartId(): Promise<string | null> {
    let cartId = localStorage.getItem('cart_id');

    if (!cartId) {
      cartId = await this.getCartIdFromFirestore();
      if (cartId) {
        localStorage.setItem('cart_id', cartId);
      }
    }
    return cartId;
  }

  async getCartIdFromFirestore(): Promise<string | null> {
    const snapshot = await this.firestore.collection('carts')
      .doc(this.authService.getUser.uid)
      .get()
      .toPromise();

    if (snapshot.exists) {
      return snapshot.get('cart_id');
    } else {
      return null;
    }
  }

  createOrUpdateCart(cartId: string): Promise<void> {
    return this.firestore
      .collection('carts')
      .doc(this.authService.getUser.uid)
      .set({ cart_id: cartId }, { merge: true });
  }

  deleteCart(): Promise<void> {
    return this.firestore.collection('carts').doc(this.authService.getUser.uid).delete();
  }
}