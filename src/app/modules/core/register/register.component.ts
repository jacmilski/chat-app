import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buildRegisterForm();
  }

  buildRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      displayName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    })
  }

  get email() {
    return this.registerForm.get('email'); // getter żeby mieć dostęp do pola w templatce
  }

  get displayName() {
    return this.registerForm.get('displayName');
  }

  get password() {
    return this.registerForm.get('password');
  }

  register() {
    this.authService.register(this.registerForm.value)
  }

}
