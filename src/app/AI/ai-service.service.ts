import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AIModel} from "./AIModel/aimodel";
import {environment} from "../../environments/environment.development";
import {Observable} from "rxjs";
import {AIResponse} from "../interfaces/interfaces";


interface aiModel{
  status:number
  message:string
}

@Injectable({
  providedIn: 'root'
})



export class AiServiceService {

  apiURL:string = environment.aiAPI;
  constructor(private http: HttpClient) { }

  getAIMessage(message:string,token:string):Observable<AIResponse> {
    return this.http.get<AIResponse>(this.apiURL + message, {
      headers: new HttpHeaders({'Authorization': `Bearer ${token}`}
      ),})
  }
}
