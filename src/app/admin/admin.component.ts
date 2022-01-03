import { Component } from "@angular/core";
import { UserService } from "../services/user.service";
import { User } from "../services/user";
import { SanaService } from "../services/sana.service";
import { Sana } from "../services/sana";
import { AuthService, TokenPayload } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent {
  constructor(
    private sanaService: SanaService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUsers();
    this.getSanat();
  }

  getUsers() {
    this.userService.getUsers().subscribe((res) => {
      this.userService.users = res as User[];
    });
  }
  deleteUser(_id: string) {
    this.userService.deleteUser(_id).subscribe((res) => {
      this.getUsers();
      this.userService.selectedUser = new User();
    });
  }

  getSanat() {
    this.sanaService.getSanat().subscribe((res) => {
      this.sanaService.sanat = res as Sana[];
    });
  }
  deleteSana(_id: string) {
    this.sanaService.deleteSana(_id).subscribe((res) => {
      this.getSanat();
      this.sanaService.selectedSana = new Sana();
    });
  }
}
