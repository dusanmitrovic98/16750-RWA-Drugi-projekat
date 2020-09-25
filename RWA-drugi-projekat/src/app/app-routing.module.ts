import { UserProfileComponent } from './components/users/user-profile/user-profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { NgModule } from '@angular/core';
import { Role } from './models/role';

const accountModule = () =>
  import('./components/account/account/account.module').then(
    (x) => x.AccountModule
  );
const usersModule = () =>
  import('./components/users/users/users.module').then((x) => x.UsersModule);
const productsModule = () =>
  import('./components/products/products.module').then((x) => x.ProductsModule);

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },
  {
    path: 'product',
    loadChildren: productsModule,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
