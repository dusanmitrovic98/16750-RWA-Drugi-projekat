import { UsersRoutingModule } from './../users-routing/users-routing.module';
import { UserListComponent } from './../user-list/user-list.component';
import { EditUserComponent } from './../edit-user/edit-user.component';
import { LayoutComponent } from './../layout/layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

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