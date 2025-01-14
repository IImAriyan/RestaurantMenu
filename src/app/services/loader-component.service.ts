import { Injectable, ComponentFactoryResolver, Injector, ViewContainerRef } from '@angular/core';
import {RegisterAuthComponent} from "../Authentication/register-auth/register-auth.component";
import {LoginAuthComponent} from "../Authentication/login-auth/login-auth.component";

@Injectable({
  providedIn: 'root',
})
export class ComponentLoaderService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}
  loadComponent(container: ViewContainerRef, componentType: any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    container.clear();
    container.createComponent(componentFactory, 0, this.injector);
  }
}
