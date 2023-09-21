import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './layout/body/body.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './services/auth/auth.guard';
import { NotFoundComponent } from './pages/404/404.component';
import { CartComponent } from './pages/cart/cart.component';
import { PaymentSuccessComponent } from './pages/payment/payment-success/payment-success.component';
import { PaymentErrorComponent } from './pages/payment/payment-error/payment-error.component';
import { Checkout1Component } from './pages/checkout/checkout-1.component';
import { Checkout2Component } from './pages/checkout/checkout-2.component';

const routes: Routes = [
  {
    path: '',
    component: BodyComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'checkout/1/:order_no',
        component: Checkout1Component,
      },
      {
        path: 'checkout/2/:order_no',
        component: Checkout2Component,
      },
      {
        path: 'payment/success',
        component: PaymentSuccessComponent,
      },
      {
        path: 'payment/error',
        component: PaymentErrorComponent,
      },
    ],
    data: {
      isMainHeader: true,
    }
  },
  {
    path: 'auth',
    children: [
      {
        path: '',
        component: BodyComponent,
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/auth/auth.module').then(
            (m) => m.AuthModule
          ),
      },
    ],
    data: {
      isMainHeader: false,
    }
  },
  {
    path: '**',
    component: BodyComponent,
    children: [
      {
        path: '',
        component: NotFoundComponent,
      },
    ],
    data: {
      isMainHeader: false,
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
