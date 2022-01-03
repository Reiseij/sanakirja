import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AppComponent } from "./app.component";
import { AdminComponent } from "./admin/admin.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { Home2Component } from "./home2/home2.component";
import { HakuComponent } from "./haku/haku.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "loginpage",
    component: LoginComponent,
  },
  {
    path: "adminpage",
    component: AdminComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "registerpage",
    component: RegisterComponent,
  },
  {
    path: "homepage",
    component: HomeComponent,
  },
  {
    path: "homepage2",
    component: Home2Component,
  },
  {
    path: "haku",
    component: HakuComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
