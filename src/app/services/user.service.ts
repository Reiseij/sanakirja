import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  selectedUser: User;
  users: User[];

  constructor(private http: HttpClient) {
    this.selectedUser = new User();
  }
  getUsers() {
    return this.http.get(`http://localhost:3000/users`);
  }
  deleteUser(_id: string) {
    return this.http.delete(`http://localhost:3000/user/${_id}`);
  }
}
