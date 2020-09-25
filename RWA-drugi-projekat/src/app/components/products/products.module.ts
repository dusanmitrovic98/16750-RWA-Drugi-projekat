import { CarouselTrailerImagesComponent } from './product/carousel-trailer-images/carousel-trailer-images.component';
import { DeleteProductModalComponent } from './product/delete-product-modal/delete-product-modal.component';
import { SystemRequirementsComponent } from './product/system-requirements/system-requirements.component';
import { SocialLinksComponent } from './product/social-links/social-links.component';
import { ProductsRoutingModule } from './products-routing/products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { FilterProductsPipe } from './../../pipes/filter-products.pipe';
import { DetailsComponent } from './product/details/details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductService } from '../../services/product.service';
import { ProductComponent } from './product/product.component';
import { InfoComponent } from './product/info/info.component';
import { SearchComponent } from '../search/search.component';
import { UserService } from 'src/app/services/user.service';
import { FilterPipe } from './../../pipes/filter.pipe';
import { PopoverModule } from 'ngx-smart-popover';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

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
    SystemRequirementsComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    FontAwesomeModule,
    PopoverModule,
  ],
  providers: [ProductService, UserService],
  exports: [
    ProductComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductListComponent,
    SearchComponent,
    FilterProductsPipe,
  ],
})
export class ProductsModule {}
