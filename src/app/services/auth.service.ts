import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

export interface UserDetails {
  _id: string;
  username: string;
  password: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  _id: string;
  username: string;
  password: string;
}

@Injectable()
export class AuthService {
  private token: string;
  constructor(private http: HttpClient, private router: Router) {}

  // tallentaa tokenin localstorageen
  private saveToken(token: string): void {
    localStorage.setItem("usertoken", token);
    this.token = token;
  }

  // tokeni etsitään localstoragesta
  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("usertoken");
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  //onko käyttäjä kirjautunut sisään
  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public register(user: TokenPayload): Observable<any> {
    const base = this.http.post(
      window.location.protocol +
        "//" +
        window.location.hostname +
        ":3000" +
        "/register",
      user
    );

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public login(user: TokenPayload): Observable<any> {
    const base = this.http.post(
      window.location.protocol +
        "//" +
        window.location.hostname +
        ":3000" +
        "/login",
      user
    );
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public profile(): Observable<any> {
    return this.http.get(`/profile`, {
      headers: { Authorization: `${this.getToken()}` },
    });
  }

  public logout(): void {
    this.token = "";
    window.localStorage.removeItem("usertoken");
    this.router.navigateByUrl("/");
  }
}
