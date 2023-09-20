import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CartItem } from 'src/app/models/cart.model';
import { CustomDialogService } from 'src/app/services/custom-dialog/custom-dialog.service';
  
  @Component({
    selector: 'app-cart-card',
    templateUrl: './cart-card.component.html',
  })
  export class CartCardComponent {
    constructor(
      private cartService: CartService,
      private customDialogService: CustomDialogService
    ) {}

    @Input() cart: CartItem;

    async deleteItem() {
      this.customDialogService.openConfirmationDialog(
        'Are you sure you want to delete this item?', 
        async () => {
          this.cart.isDeleting = true;
          try {
            await this.cartService.updateCart(this.cart.id, 0);
          } finally {
            this.cart.isDeleting = false;
          }
        },
      );
    }

    startEditing(): void {
      this.cart.isEditing = true;
      this.cart.newQuantity = this.cart.quantity;
    }
  
    async saveChanges(): Promise<void> {
      const newQuantity = this.cart.newQuantity;
  
      if (newQuantity !== null && newQuantity > 0 && newQuantity !== this.cart.quantity) {
        try {
          this.cart.isLoading = true;
          await this.cartService.updateCart(this.cart.id, newQuantity);
        } finally {
          this.cart.isLoading = false;
          this.cart.isEditing = false;
        }
      } else {
        this.cart.isEditing = false;
      }
    }
  
    cancelChanges(): void {
      this.cart.isEditing = false;
    }
  }