import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './layout/body/body.component';
import { MainHeaderComponent } from './layout/main-header/main-header.component';
import { HomeComponent } from './pages/home/home.component';

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
        component: HomeComponent,
      },
    ],
    data: {
      isMainHeader: true,
    }
  },
  {
    path: '',
    children: [
      {
        path: 'auth',
        component: BodyComponent,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
