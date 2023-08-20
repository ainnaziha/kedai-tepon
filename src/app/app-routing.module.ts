import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './layout/body/body.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './services/auth/auth.guard';
import { NotFoundComponent } from './pages/404/404.component';
import { CartComponent } from './pages/cart/cart.component';
import { StripePaymentComponent } from './pages/payment/stripe-payment.component';

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
        path: 'payment',
        component: StripePaymentComponent,
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
