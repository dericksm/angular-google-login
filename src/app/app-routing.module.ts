import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignUpComponent } from "./components/signup/signup.component";
import { SignInComponent } from "./components/signin/signin.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuardService } from "./guards/auth-guard.service";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: SignInComponent },
  { path: "signup", component: SignUpComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    pathMatch: "full"
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
