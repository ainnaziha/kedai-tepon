import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map } from 'rxjs';
import { CartItem } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements AfterViewInit, OnInit {
  constructor(
    public cartService: CartService
   ) {}

  displayedColumns: string[] = ['product', 'price', 'quantity', 'total'];
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
}