import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs';
import {selectIsAuthenticated} from '../../store/auth/auth.selectors';
import {AppState} from '../../store/app.state';
import {Store} from '@ngrx/store';

export const guestGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<AppState>);
  const router = inject(Router);

  return store.select(selectIsAuthenticated).pipe(
    take(1),
    map(isAuthenticated => {
      if (!isAuthenticated) {
        return true;
      } else {
        return router.createUrlTree(['/products']);
      }
    })
  );
};
