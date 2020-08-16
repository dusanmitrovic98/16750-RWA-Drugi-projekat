import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './../users-routing/users-routing.module';
import { LayoutComponent } from './../layout/layout.component';
import { UserListComponent } from './../user-list/user-list.component';
import { EditUserComponent } from './../edit-user/edit-user.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsersRoutingModule
    ],
    declarations: [
        LayoutComponent,
        UserListComponent,
        EditUserComponent
    ]
})
export class UsersModule { }