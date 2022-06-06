import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs/index';

export interface Credentials {
  email: string;
  password: string;
  displayName: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user!: Observable<firebase.User | null>; // firebase.User - typ wbudowany w Firebase przechowujący użytkowników
  authState: any;

  constructor(
    private router: Router,
    private db: AngularFireDatabase,
    private fireAuth: AngularFireAuth, // servis wbudowany w Angulara
  ) {
    this.user = this.fireAuth.authState; // inicjalizacja użytkownika
  }

  get currentUserId() {
    return this.authState !== null ? this.authState.user.uid : '';
  }

  getUser() {
    return this.user;
  }

  setUser(login: string, userName: string) {
    const path = `users/${this.currentUserId}`;
    const userData = {
      email: login,
      displayName: userName, // Firebase wymaga formatu 'displayName'
      uid: this.currentUserId,
    }

    this.db.object(path).update(userData)
      .catch(err => console.log(err.message))
  }

  register(credentials: Credentials) {
    return this.fireAuth.createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((user: firebase.auth.UserCredential) => {
        this.authState = user;
        this.setUser(credentials.email, credentials.displayName); // zapisanie użytkownika do bazy danych
        this.router.navigate(['/chat']);
      })
      .catch(err => console.log(err.message))
  }

  login(credentials: Credentials) {
    return this.fireAuth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((user: firebase.auth.UserCredential) => {
        this.authState = user;
        this.router.navigate(['/chat']);
      })
      .catch(err => console.log(err.message))
  }

  logout() {
    this.fireAuth.signOut()
      .then(() => this.router.navigate(['/login']))
      .catch(err => console.log(err.message))
  }
}

