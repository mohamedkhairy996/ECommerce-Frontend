import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../Models/user';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  imports: [CommonModule,RouterLink],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
user : User | null = null;
  userAdmin : boolean = false;
  constructor(private _userService:UserService) {
    this._userService.getUser().subscribe({
      next: (res) => {
        this.user = res;
        if(res.role.includes('Admin'))
        {
          this.userAdmin = true;
        }
      },
      error: (err) => {
        console.error('Error loading user', err);
        this.user = null;
        this.userAdmin = false;
      }
    });
  }

  logout() {
    // حذف الكوكيز عن طريق إرسال طلب تسجيل خروج إلى الخادم
    this._userService.logOut().subscribe({
      next: (res) => {
        this.user = null;
        this.userAdmin = false;
        // إعادة تحميل الصفحة أو إعادة التوجيه إلى صفحة تسجيل الدخول
        window.location.href = '/login'; // أو أي صفحة تريد إعادة التوجيه إليها
      }
    });
  }

}
