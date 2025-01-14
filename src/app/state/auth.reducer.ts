import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.actions';
import {initialAuthState} from './app.state';

const _authReducer = createReducer(
  initialAuthState,
  on(loginSuccess, (state, { token }) => ({ ...state, token })),
  on(logout, (state) => ({ ...state, token: null }))
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}
