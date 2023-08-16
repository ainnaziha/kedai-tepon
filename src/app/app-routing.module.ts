import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layout/full/full.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full',
      },
      {
        path: 'auth',
        component: FullComponent,
        loadChildren: () =>
          import('./pages/auth/auth.module').then(
            (m) => m.AuthModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
