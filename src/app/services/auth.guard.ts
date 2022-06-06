import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe( // pipe jako opakowanie na kompozycję operatorów
      take(1),
      map((user: any) => !!user), // mapujemy użytkownika na booelana
      tap(loggedIn => { // tap - metoda wykonywana na zakończenie
        if (!loggedIn) {
          this.snackBar.open('Access denied, please sign in', '', {panelClass: 'snack-bg-color'});
          this.router.navigate(['/login'])
        }
      })
    );
  }

}
