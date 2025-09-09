import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // خليك متأكد إنها styleUrls (جمع)
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder , private _userService:UserService , private _router:Router) {}

  ngOnInit(): void {
    // لازم يتبني قبل ما التمبلت يتعامل معاه
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Getter آمن (يمنع undefined في أول رندر)
  get f() {
    return this.loginForm?.controls as any;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    // نادِ API تسجيل الدخول هنا
    this._userService.signIn(this.loginForm.value).subscribe({
      next: () => {
        Swal.fire({
        icon: 'success',
        title: 'Welcome!',
        showConfirmButton: false,
        timer: 3000
});

        location.href = '/home';
      },
      error: (err) => {
        console.error('Login error', err);
      }
    });
  }

  onForgotPassword(): void {
    // navigation أو call للـ API
  }
}
