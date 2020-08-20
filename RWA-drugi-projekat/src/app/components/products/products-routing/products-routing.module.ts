import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductComponent } from "./../product/product.component";
import { ProductAddComponent } from "./../product-add/product-add.component";
import { ProductEditComponent } from "./../product-edit/product-edit.component";
import { ProductListComponent } from "./../product-list/product-list.component";

const routes: Routes = [
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