import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductsRoutingModule } from './products-routing/products-routing.module';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { DeleteProductModalComponent } from './product/delete-product-modal/delete-product-modal.component';
import { CarouselTrailerImagesComponent } from './product/carousel-trailer-images/carousel-trailer-images.component';
import { SearchComponent } from '../search/search.component';
import { InfoComponent } from './product/info/info.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DetailsComponent } from './product/details/details.component';
import { FilterPipe } from './../../pipes/filter.pipe';
import { FilterProductsPipe } from './../../pipes/filter-products.pipe';
import {PopoverModule} from "ngx-smart-popover";
import { SocialLinksComponent } from './product/social-links/social-links.component';
import { SystemRequirementsComponent } from './product/system-requirements/system-requirements.component';


@NgModule({
  declarations: [
    ProductComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductListComponent,
    DeleteProductModalComponent,
    CarouselTrailerImagesComponent,
    SearchComponent,
    InfoComponent,
    DetailsComponent,
    FilterPipe,
    FilterProductsPipe,
    SocialLinksComponent,
    SystemRequirementsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    FontAwesomeModule,
    PopoverModule
  ],
  providers: [ProductService, UserService],
  exports: [
    ProductComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductListComponent,
    SearchComponent,
    FilterProductsPipe
  ]
})
export class ProductsModule {}
