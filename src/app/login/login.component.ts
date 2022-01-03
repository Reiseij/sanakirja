import { Component, OnInit } from "@angular/core";
import { AuthService, TokenPayload } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  credentials: TokenPayload = {
    _id: "",
    username: "",
    password: "",
  };

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  login() {
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl("/homepage");
        console.log(this.credentials);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
