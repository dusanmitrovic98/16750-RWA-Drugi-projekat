import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap, concatMap } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import * as fromProductActions from '../../store/actions/product.actions';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProductActions.ProductActionsTypes.LOAD_PRODUCTS),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) => ({
            type: fromProductActions.ProductActionsTypes.LOAD_PRODUCTS_SUCCESS,
            products: products,
          })),
          catchError((error) =>
            of(new fromProductActions.loadProductsFailure({ error }))
          )
        )
      )
    )
  );

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromProductActions.loadProduct>(
        fromProductActions.ProductActionsTypes.LOAD_PRODUCT
      ),
      map((action) => action.id),
      mergeMap((id: string) =>
        this.productService.getProduct(id).pipe(
          map((product) => ({
            type: fromProductActions.ProductActionsTypes.LOAD_PRODUCT_SUCCESS,
            selectedProduct: product,
          })),
          catchError((error) =>
            of(new fromProductActions.loadProductFailure({ error }))
          )
        )
      )
    )
  );

  createProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromProductActions.addProduct>(
        fromProductActions.ProductActionsTypes.ADD_PRODUCT
      ),
      mergeMap((action) =>
        this.productService.createProduct(action.product).pipe(
          map((product) => ({
            type: fromProductActions.ProductActionsTypes.ADD_PRODUCT_SUCCESS,
            product: product,
          })),
          catchError((error) =>
            of(new fromProductActions.addProductFailure({ error }))
          )
        )
      ),
      tap(() => this.router.navigate(['/product/list']))
    )
  );

  updateProducts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<fromProductActions.updateProduct>(
          fromProductActions.ProductActionsTypes.UPDATE_PRODUCT
        ),
        concatMap((action) =>
          this.productService.editProduct(
            action.product.id,
            action.product.changes
          )
        ),
        tap(() => this.router.navigate(['/product/list']))
      ),
    { dispatch: false }
  );

  deleteProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromProductActions.ProductActionsTypes.DELETE_PRODUCT
      ),
      map((action: fromProductActions.deleteProduct) => action.id),
      mergeMap((id: string) =>
        this.productService.deleteProduct(id).pipe(
          map(() => ({
            type: fromProductActions.ProductActionsTypes.DELETE_PRODUCT_SUCCESS,
            id: id,
          })),
          catchError((error) =>
            of(new fromProductActions.deleteProductFailure({ error }))
          )
        )
      ),
      tap(() => this.router.navigate(['/product/list']))
    )
  );
  /*
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProductActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) =>
            fromProductActions.loadProductsSuccess({ products })
          ),
          catchError((error) =>
            of(fromProductActions.loadProductsFailure({ error }))
          )
        )
      )
    )
  );

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProductActions.loadProduct),
      mergeMap((action) =>
        this.productService.getProduct(action.id).pipe(
          map((product) =>
            fromProductActions.loadProductSuccess({ selectedProduct: product })
          ),
          catchError((error) =>
            of(fromProductActions.loadProductFailure({ error }))
          )
        )
      )
    )
  );

  createProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProductActions.addProduct),
      mergeMap((action) =>
        this.productService.createProduct(action.product).pipe(
          map((product) => fromProductActions.addProductSuccess({ product })),
          catchError((error) =>
            of(fromProductActions.addProductFailure({ error }))
          )
        )
      ),
      tap(() => this.router.navigate(['/product/list']))
    )
  );

  updateProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProductActions.updateProduct),
      concatMap((action) =>
        this.productService.editProduct(
          action.product.id,
          action.product.changes
        )
      ),
      tap(() => this.router.navigate(['/product/list']))
    ),
    { dispatch: false }
  );

  deleteProducts$ = createEffect(() =>
  this.actions$.pipe(
    ofType(fromProductActions.deleteProduct),
    mergeMap((action) =>
      this.productService.deleteProduct(action.id).pipe(
        map((product) => fromProductActions.deleteProductSuccess({ id: action.id })),
        catchError((error) =>
          of(fromProductActions.deleteProductFailure({ error }))
        )
      )
    ),
    tap(() => this.router.navigate(['/product/list']))
  )
);*/

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private router: Router
  ) {}
}
