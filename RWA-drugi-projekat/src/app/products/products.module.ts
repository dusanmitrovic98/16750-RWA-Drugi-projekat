import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromProductState from './store';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromProductState.productStateFeatureKey, fromProductState.reducers, { metaReducers: fromProductState.metaReducers })
  ]
})
export class ProductsModule { }
