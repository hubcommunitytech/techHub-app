import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private authenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  isAuthenticated$ = this.authenticatedSubject.asObservable();

  constructor() { }

  isAuthenticated(): boolean {
    const vlr = typeof window !== 'undefined' ? sessionStorage.getItem('user') : null;
    return !!vlr;
  }

  login(form: any) {
    if (form) {
      sessionStorage.setItem('user', JSON.stringify(form));
      this.authenticatedSubject.next(true);
    }
  }

  logout() {
    sessionStorage.removeItem('user');
    this.authenticatedSubject.next(false);
  }
}
