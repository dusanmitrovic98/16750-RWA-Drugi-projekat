import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromProductState from '../../products/store/product.reducer';
import { ProductService } from '../../services/product.service';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductsRoutingModule } from './products-routing/products-routing.module';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from "@ngrx/effects";
import * as fromProduct from "./../../products/store/product.reducer";
import { ProductEffects } from '../../products/store/product.effects';

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
    FormsModule,
    EffectsModule.forFeature([ProductEffects]),
    StoreModule.forFeature(fromProduct.productsFeatureKey, fromProduct.reducer)
  ],
  providers: [ProductService],
  exports: [
    ProductComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductListComponent
  ]
})
export class ProductsModule {}
