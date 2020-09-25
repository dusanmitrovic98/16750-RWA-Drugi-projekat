import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccountRoutingModule } from './../account-routing/account-routing.module';
import { RegisterComponent } from './../register/register.component';
import { LayoutComponent } from './../layout/layout.component';
import { LoginComponent } from './../login/login.component';

@NgModule({
    imports: [  
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule
    ],
    declarations: [
        LayoutComponent,
        LoginComponent,
        RegisterComponent
    ]
})
export class AccountModule { }