import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {AuthState} from "../../state/app.state";
import {logout} from "../../state/auth.actions";
import {isTokenExpired} from "../../state/auth";
import {Router} from "@angular/router";
import {jwtDecode} from "jwt-decode";
import {JwtDecoded} from "../../interfaces/interfaces";
import {DashboardService} from "../../services/dashboard.service";
import {User} from "../../models/user";
import {Roles} from "../../enums/enums";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  token:string | null = null;
  user: User = new User(
    "",
    "",
    "",
    "",
    "[]"
  );
  constructor(private store:Store<{ auth: AuthState }>, private router:Router, private dashboardService:DashboardService) {
    store.select(state=>state.auth).subscribe((auth: AuthState) => {
      this.token = auth.token;
      if (this.token && !isTokenExpired(this.token)) {
        const decodedJWT: JwtDecoded = jwtDecode<JwtDecoded>(this.token)
        const userID : string = decodedJWT.user_id
        dashboardService.userDATA(this.token,userID).subscribe((userData:User)=>{
          this.user = userData
          console.log(this.user)
        },(err)=>{
          console.log(err)
        })
      }else {
        this.store.dispatch(logout())
        this.router.navigate(['/login']);
      }
    })
  }

  protected readonly Roles = Roles;
  protected readonly console = console;
}
