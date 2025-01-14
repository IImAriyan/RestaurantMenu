import { ActionReducer, INIT } from '@ngrx/store';
import { AuthState } from './app.state';

export function localStorageMetaReducer(
  reducer: ActionReducer<{ auth: AuthState }, any>
): ActionReducer<{ auth: AuthState }, any> {
  return function(state: { auth: AuthState } | undefined, action: any): { auth: AuthState } {
    if (action.type === INIT) {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        return { auth: { token: savedToken } };
      }
      return state ?? { auth: { token: null } };
    }
    const nextState = reducer(state, action);
    if (nextState.auth.token) {
      localStorage.setItem('token', nextState.auth.token);
    } else {
      localStorage.removeItem('token');
    }

    return nextState;
  };
}
