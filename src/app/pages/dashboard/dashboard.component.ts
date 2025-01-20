import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {AuthState} from "../../state/app.state";
import {logout} from "../../state/auth.actions";
import {isTokenExpired} from "../../state/auth";
import {Router, RouterLink} from "@angular/router";
import {jwtDecode} from "jwt-decode";
import {JwtDecoded} from "../../interfaces/interfaces";
import {DashboardService} from "../../services/dashboard.service";
import {User} from "../../models/user";
import {Roles} from "../../enums/enums";
import {NgClass} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import {
  MatCell,
  MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef, MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FoodMODEL} from "../../models/food-model";
import {CategoryService} from "../../services/category.service";
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    MatIcon,
    AgGridAngular,
    MatPaginator,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatCellDef,
    MatCell,
    MatHeaderCell,
    MatHeaderCellDef,
    MatColumnDef,
    MatTable
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
  nowPage:string = "home";
  displayedColumns: string[] = ['category','description','image','price','product_ID','title'];
  dataSource  : MatTableDataSource<FoodMODEL, MatPaginator> = new MatTableDataSource() ;

  constructor(private store:Store<{ auth: AuthState }>,private categoryService:CategoryService,private router:Router, private dashboardService:DashboardService) {
    store.select(state=>state.auth).subscribe((auth: AuthState) => {
      this.token = auth.token;
      if (this.token && !isTokenExpired(this.token)) {
        const decodedJWT: JwtDecoded = jwtDecode<JwtDecoded>(this.token)
        const userID : string = decodedJWT.user_id
        dashboardService.userDATA(this.token,userID).subscribe((userData:User)=>{
          this.user = userData
          if (this.user.role == Roles.ADMIN || this.user.role == Roles.FOUNDER) {
            categoryService.loadProducts().subscribe((products:FoodMODEL[])=>{
              this.dataSource = new MatTableDataSource(products);
              console.log(this.dataSource)
            })
          }
        },(err)=>{
          console.log(err)
        })


      }else {
        this.store.dispatch(logout())
        this.router.navigate(['/login']);
      }
    })
  }

  setPage(page:string):void {
    this.nowPage = page
  }

  protected readonly Roles = Roles;
  protected readonly MatTableDataSource = MatTableDataSource;
}
