
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Role } from './../models/role';
import { User } from './../models/user';
import {
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HTTP_INTERCEPTORS,
  } from '@angular/common/http';

let userAdmin: User = {
  id: 1,
  username: 'admin',
  password: 'admin',
  firstName: 'Dušan',
  lastName: 'Mitrović',
  role: Role.Admin,
  boughtItemId: [],
};
let usersFromLocalStorage = JSON.parse(localStorage.getItem('users'));
let users: User[] = usersFromLocalStorage;
if (usersFromLocalStorage.length == 0) {
  users.push(userAdmin);
  localStorage.setItem('users', JSON.stringify(users));
  alert('Message for admin: hahaha you deleted yourself once again hahah...');
}

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) 
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users/register') && method === 'POST':
          return register();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.match(/\/users\/\d+$/) && method === 'GET':
          return getUserById();
        case url.match(/\/users\/\d+$/) && method === 'PUT':
          return updateUser();
        case url.match(/\/users\/\d+$/) && method === 'DELETE':
          return deleteUser();
        default:
          return next.handle(request);
      }
    }

    function authenticate() {
      const { username, password } = body;
      const user = users.find(
        (x) => x.username === username && x.password === password
      );
      if (!user) return error('Username or password is incorrect');
      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        token: `fake-jwt-token.${user.id}`,
        boughtItemId: user.boughtItemId,
      });
    }

    function register() {
      const user = body;
      if (!user.boughtItemId) {
        user.boughtItemsId = new Array<number>();
      }

      if (users.find((x) => x.username === user.username)) {
        return error('Username "' + user.username + '" is already taken');
      }

      user.id = users.length ? Math.max(...users.map((x) => x.id)) + 1 : 1;
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      return ok();
    }

    function getUsers() {
      if (!isLoggedIn()) return unauthorized();
      return ok(users);
    }

    function getUserById() {
      if (!isLoggedIn()) return unauthorized();
      if (!isAdmin() && currentUser().id !== idFromUrl()) return unauthorized();
      const user = users.find((x) => x.id === idFromUrl());
      return ok(user);
    }

    function updateUser() {
      if (!isLoggedIn()) return unauthorized();
      let params = body;
      let user = users.find((x) => x.id === idFromUrl());
      if (!params.password) {
        delete params.password;
      }
      Object.assign(user, params);
      localStorage.setItem('users', JSON.stringify(users));

      return ok();
    }

    function deleteUser() {
      if (!isLoggedIn()) return unauthorized();
      users = users.filter((x) => x.id !== idFromUrl());
      localStorage.setItem('users', JSON.stringify(users));
      return ok();
    }

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'unauthorized' } });
    }

    function error(message) {
      return throwError({ status: 400, error: { message } });
    }

    function isLoggedIn() {
      const authHeader = headers.get('Authorization') || '';
      return authHeader.startsWith('Bearer fake-jwt-token');
    }

    function isAdmin() {
      return isLoggedIn() && currentUser().role === Role.Admin;
    }

    function currentUser() {
      if (!isLoggedIn()) return;
      const id = parseInt(headers.get('Authorization').split('.')[1]);
      return users.find((x) => x.id === id);
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
