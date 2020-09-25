
import { ProductEditComponent } from "./../product-edit/product-edit.component";
import { ProductListComponent } from "./../product-list/product-list.component";
import { ProductAddComponent } from "./../product-add/product-add.component";
import { ProductComponent } from "./../product/product.component";
import { HomeComponent } from '../../home/home.component';
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "get/:id", component: ProductComponent },
  { path: "add", component: ProductAddComponent },
  { path: "edit/:id", component: ProductEditComponent },
  { path: "list", component: ProductListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}