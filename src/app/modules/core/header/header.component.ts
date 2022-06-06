import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user!: firebase.User | null;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.user = user;
    })
  }

  signOut() {
    this.authService.logout();
  }

}
