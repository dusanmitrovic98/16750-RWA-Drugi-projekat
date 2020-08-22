import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromProductState from '../../store/reducers/product.reducer';
import { ProductService } from '../../services/product.service';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductsRoutingModule } from './products-routing/products-routing.module';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from "@ngrx/effects";
import * as fromProduct from "../../store/reducers/product.reducer";
import { UserService } from 'src/app/services/user.service';
import { ProductEffects } from 'src/app/store/effects/product.effects';
import { rootReducer } from 'src/app/store/reducers/root.reducer';
import { UserEffects } from 'src/app/store/effects/user.effects';

@NgModule({
  declarations: [
    ProductComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule
  ],
  providers: [ProductService, UserService],
  exports: [
    ProductComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductListComponent
  ]
})
export class ProductsModule {}
