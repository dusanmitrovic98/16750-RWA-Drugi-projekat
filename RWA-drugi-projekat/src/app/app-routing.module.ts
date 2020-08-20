import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './helpers/auth.guard';
import { Role } from './models/role';

const accountModule = () => import('./components/account/account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./components/users/users/users.module').then(x => x.UsersModule);
const productsModule = () => import('./components/products/products.module').then(x => x.ProductsModule);

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    {
        path: "product",
        //loadChildren: "../app/products/products.module#ProductsModule"
        loadChildren: productsModule
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }