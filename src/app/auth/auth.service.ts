import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5165/api'; 
  constructor(private http: HttpClient) { }

  register(username: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/users/register`, { username, email, password });
  }

  login(username: string, password: string) {
    return this.http.post<{token: string, username: string, userId: string}>(`${this.apiUrl}/users/login`, { username, password })
      .pipe(tap(res => {
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('username', res.username);
        localStorage.setItem('user_id', res.userId);
      }));
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

  public get userName(): string {
    return (localStorage.getItem('username') ?? 'Anonymous');
  }

  public get userId(): string {
    return (localStorage.getItem('user_id') ?? '');
  }
}
