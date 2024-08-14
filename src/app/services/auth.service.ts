import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private httpClient: HttpClient
    ) {}

    private signupUrl = 'http://localhost:5052/api/user/signup';
    private loginUrl = 'http://localhost:5052/api/auth/login';
    private logoutUrl = 'http://localhost:5052/api/user/logout'

    // Signup Request
    signup(userData: any): Observable<any> {
        return this.httpClient.post(this.signupUrl, userData);
    }

    // Login Request
    login(credentials: any): Observable<any> {
        return this.httpClient.post(this.loginUrl, credentials);
    }

    // Logout Request
    logout(): Observable<any> {
        // @ts-ignore
        return this.httpClient.post(this.logoutUrl);
    }
}