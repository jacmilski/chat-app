import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.buildLoginForm();
  }

  private buildLoginForm() {
    this.loginForm = this.formBuilder.group({
        email: ['', [ Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]
      })
  }

  get email() {
    return this.loginForm.get('email'); // getter żeby mieć dostęp do pola w templatce
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    this.authService.login(this.loginForm.value)
  }
}
