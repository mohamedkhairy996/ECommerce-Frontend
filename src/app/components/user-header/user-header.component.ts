import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../Models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-header',
  imports: [RouterLink , CommonModule],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent {
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
