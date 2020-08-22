import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';

export function createOnline$() {
  return merge<boolean>(
    fromEvent(window, 'offline').pipe(map(() => false)),
    fromEvent(window, 'online').pipe(map(() => true)),
    new Observable((sub: Observer<boolean>) => {
      sub.next(navigator.onLine);
      sub.complete();
    })
  );
}
