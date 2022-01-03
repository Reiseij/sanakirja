import { Component } from "@angular/core";
import { AuthService, TokenPayload } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  credentials: TokenPayload = {
    _id: "",
    username: "",
    password: "",
  };

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl("/homepage");
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
