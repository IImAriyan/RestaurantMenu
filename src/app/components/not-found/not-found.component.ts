import {Component, OnInit} from '@angular/core';
import {LoaderComponent} from "../loader/loader.component";
import {HeaderComponent} from "../header/header.component";
import {NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {HomeComponent} from "../../pages/home/home.component";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    LoaderComponent,
    HeaderComponent,
    HomeComponent,
    NgIf,
    RouterLink,

  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements OnInit{
  isLoading = true;
  fromCOMPONENT:string = "";
  constructor(private title:Title,private route:ActivatedRoute,private router:Router) {
    title.setTitle("Arian Restaurant");
    this.route.queryParams.subscribe(params => {
      this.fromCOMPONENT =  params['data'] || 'not'
    });

    //
    setTimeout(()=>{
      this.fromCOMPONENT = 'not'
      // delete route
      this.router.navigate([])
    },2000)
  }

  ngOnInit() {
    if (this.isLoading) {
      this.isLoading = false;
    }
  }
}
