import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import { CommerceService } from 'src/app/services/commerce-js/commerce.service';
import { ErrorDialogService } from 'src/app/services/error-dialog/error-dialog.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements AfterViewInit, OnInit {
  constructor(
    private cartService: CartService,
    private commerceService: CommerceService,
    private errorDialogService: ErrorDialogService,
    private router: Router,
    private checkoutService: CheckoutService
   ) {}

  displayedColumns: string[] = ['product', 'price', 'quantity', 'total', 'id'];
  dataSource$: Observable<MatTableDataSource<CartItem>>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource$ = this.cartService.cartItems$.pipe(
      map(newCartItems => new MatTableDataSource<CartItem>(newCartItems))
    );
  }

  ngAfterViewInit() {
    this.dataSource$.subscribe(dataSource => {
      dataSource.paginator = this.paginator;
    });
  }

  deleteItem(id: string) {
    this.cartService.deleteCart(id);
  }

  startEditing(element: CartItem): void {
    element.isEditing = true;
    element.newQuantity = element.quantity;
  }

  saveChanges(element: CartItem): void {
    element.isEditing = false;
    const newQuantity = element.newQuantity;

    if (newQuantity !== null && newQuantity > 0 && newQuantity !== element.quantity) {
      this.cartService.updateCart(element.id, newQuantity);
    } 
  }

  cancelChanges(element: CartItem): void {
    element.isEditing = false;
  }

  get total(): string {
    return this.cartService.subTotal?.formattedWithSymbol ?? '';
  }

  get cartAvailable(): boolean {
    return (this.cartService.cart?.total_items ?? []) > 0;
  }

  async checkOut() {
    try {
      const response = await this.checkoutService.generateCheckoutToken(this.cartService.cart.id);
      this.checkoutService.setCheckoutData(response);
      this.router.navigate(['/checkout', response.id]);
    } catch (e) {
      this.errorDialogService.openDialog(e.message);
    }
  }
}