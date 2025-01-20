import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { authReducer } from "./state/auth.reducer";
import { routes } from './app.routes';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {ActionReducerMap, MetaReducer, provideStore, StoreModule} from '@ngrx/store';
import {localStorageMetaReducer} from "./state/local-storage.reducer";
import {AuthState} from "./state/app.state";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


export const reducers: ActionReducerMap<{ auth: AuthState }, any> = {
  auth: authReducer
};

export const metaReducers: MetaReducer<{ auth: AuthState }, any>[] = [localStorageMetaReducer];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideStore(reducers,{metaReducers:metaReducers}), provideAnimationsAsync(),
  ],


};
