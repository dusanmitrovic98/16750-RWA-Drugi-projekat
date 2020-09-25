import { UserProfileComponent } from './components/users/user-profile/user-profile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminComponent } from './components/admin/admin.component';
import { AlertComponent } from './components/alert/alert.component';
import { UsersModule } from './components/users/users/users.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { ProductEffects } from './store/effects/product.effects';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { fakeBackendProvider } from './helpers/fake-backend';
import { rootReducer } from './store/reducers/root.reducer';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { UserEffects } from './store/effects/user.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { StoreModule } from '@ngrx/store';
import { metaReducers } from './reducers';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    UsersModule,
    EffectsModule.forRoot([AppEffects, ProductEffects, UserEffects]),
    StoreModule.forRoot(rootReducer, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    MDBBootstrapModule.forRoot(),
    FontAwesomeModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    AlertComponent,
    UserProfileComponent,
  ],
  exports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
