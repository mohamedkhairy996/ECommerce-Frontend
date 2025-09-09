import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // لو عندك ملف CSS خاص
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  userAdmin : boolean = false;

  constructor(private formBuilder: FormBuilder , private _userService : UserService) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required] // Customer or Admin
    });

    this._userService.getUser().subscribe({
      next: (user) => {
        if(user.role.includes('Admin'))
        {
          this.userAdmin = true;
        }
      },
      error: (err) => {
        this.userAdmin = false;
      }
    });
  }

  // getter لسهولة الوصول للأخطاء في الـ template
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // إذا كان الفورم غير صحيح، توقف
    if (this.registerForm.invalid) {
      return;
    }

    // هنا تقدر ترسل البيانات للـ API
    console.log('Form Submitted!', this.registerForm.value);

    // مثال لإرسال بيانات التسجيل:
    
    this._userService.register(this.registerForm.value).subscribe({
      next: (response) => {
        Swal.fire({
            icon: 'success',
            title: 'تم التسجيل بنجاح!',
            showConfirmButton: false,
            timer: 2000
          });
        location.href='/login';
      },
      error: (err) => {
       Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'حدث خطأ أثناء التسجيل',
          confirmButtonText: 'حسناً'
        });
      }
    });
    
  }
}