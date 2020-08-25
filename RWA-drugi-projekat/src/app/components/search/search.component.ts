import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/store/reducers/root.reducer';
import { selectAllProducts } from 'src/app/store/adapters/product.adapter';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/models/product/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  productId: string = this.route.snapshot.paramMap.get('id');
  products$: Observable<Product[]>;
  @Input() modelProducts: any = {};
  @Input() model: any = {};
  @Input() searchText = '';
  @Output() newItemEvent = new EventEmitter<string>();
  names: any = {};

  constructor(private store: Store<State>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.store.pipe(select(selectAllProducts)).subscribe((products) => {
      this.products$ = of(products);
      console.log(this.products$);
      this.modelProducts = Object.assign(new Array<Product>(), products);
      this.model = Object.assign(new Product(), products[Number(this.productId)-1]);
      this.names = this.modelProducts.map((x) => {return x.name});
    });
  }

  setSearchText(value: string) {
    console.log(value);
    this.newItemEvent.emit(value);
  }
}
