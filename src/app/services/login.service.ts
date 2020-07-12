import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { isNullOrUndefined } from "util";

@Injectable({ providedIn: "root" })
export class LoginService {
  
  private URL = "http://localhost:3333";
  public currentUser: any;

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  isAuthenticated() {
    let token = localStorage.getItem("token");
    if (!isNullOrUndefined(token)) {
      return true;
    } else {
      return false;
    }
  }

  signUp(data: any): Observable<any> {
    console.log(data);
    return this.httpClient.post<any>(
      this.URL + "/users/signup",
      data,
      this.httpOptions
    );
  }

  signIn(data: any): Observable<any> {
    return this.httpClient.post<any>(
      this.URL + "/users/signin",
      data,
      this.httpOptions
    );
  }

  googleAuth(data: string): Observable<any> {
    console.log(data);
    return this.httpClient.post<any>(
      this.URL + "/users/oauth/google",
      { access_token: data },
      this.httpOptions
    );
  }

  signOut() {
    localStorage.removeItem("token");
  }
}
