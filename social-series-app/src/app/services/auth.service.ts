import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private logged = false;
  login(email: string, pass: string): boolean {
    this.logged = !!email && !!pass;
    return this.logged;
  }
  isAuthenticated() { return this.logged; }
  logout() { this.logged = false; }
}
