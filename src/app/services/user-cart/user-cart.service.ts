import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserCartService {
  constructor(private firestore: AngularFirestore) {}

  async getCartId(userId: string): Promise<string | null> {
    const snapshot = await this.firestore.collection('carts')
      .doc(userId)
      .get()
      .toPromise();

    if (snapshot.exists) {
      return snapshot.get('cart_id');
    } else {
      return null;
    }
  }

  createOrUpdateCart(userId: string, cartId: string): Promise<void> {
    return this.firestore
      .collection('carts')
      .doc(userId)
      .set({ cart_id: cartId }, { merge: true });
  }
}