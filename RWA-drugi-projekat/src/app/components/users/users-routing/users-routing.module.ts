import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './../layout/layout.component';
import { UserListComponent } from './../user-list/user-list.component';
import { EditUserComponent } from './../edit-user/edit-user.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: UserListComponent },
            { path: 'add', component: EditUserComponent },
            { path: 'edit/:id', component: EditUserComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }