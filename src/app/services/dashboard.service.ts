import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Observable} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  apiLink: string = environment.websiteAPI;
  constructor(private http: HttpClient) {}

  userDATA(token:string,userId:string):Observable<User> {
    return this.http.post<User>(this.apiLink+"/api/user/userinfo/",{
      "userID":userId
    }, {
      headers: new HttpHeaders({'Authorization': `Bearer ${token}`}
      ),})
  }

}
