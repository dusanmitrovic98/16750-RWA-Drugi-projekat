import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { fakeBackendProvider } from './helpers/fake-backend';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { AlertComponent } from './components/alert/alert.component';
import { StoreModule } from '@ngrx/store';
import { metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { rootReducer } from './store/reducers/root.reducer';
import { ProductEffects } from './store/effects/product.effects';
import { UserEffects } from './store/effects/user.effects';

@NgModule({
  imports: [
      FormsModule,
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule,
      AppRoutingModule,
      EffectsModule.forRoot([AppEffects, ProductEffects, UserEffects]),
      StoreModule.forRoot(rootReducer, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      }
    }),
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
      FontAwesomeModule
  ],
  declarations: [
      AppComponent,
      HomeComponent,
      AdminComponent,
      AlertComponent,
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

      // provider used to create fake backend
      fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
