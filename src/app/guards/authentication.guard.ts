import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthState } from "../state/app.state";
import { Observable } from "rxjs";
import { map, take, switchMap, catchError } from 'rxjs/operators';
import { logout } from "../state/auth.actions";
import { isTokenExpired } from "../state/auth";
import { UserService } from "../services/user.service";

// Route guard to check if the user is authenticated
export const authenticationGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const store = inject(Store<{ auth: AuthState }>);
  const router = inject(Router);
  let userAuth: UserService = inject(UserService);
  // Get token from store and check if it's valid
  return store.select(state => state.auth.token).pipe(
    take(1), // Take the token only once
    switchMap(token => {
      // Check if the token is expired
      if (isTokenExpired(token)) {
        store.dispatch(logout());
        return [true]; // Return false immediately if token is expired
      }

      // If token is not expired, check if it is valid
      return userAuth.isTokenValid(token).pipe(
        map((response: any) => {
          if (response) {
            router.navigate(['/dashboard']);
            return false; // Token is valid
          } else {
            store.dispatch(logout());
            return true; // Token is invalid
          }
        }),
        catchError((error) => {
          // If there is an error (e.g., API call fails), logout and redirect
          store.dispatch(logout());
          router.navigate(['/dashboard']);
          return [true]; // Return false if there was an error
        })
      );
    })
  );
};
