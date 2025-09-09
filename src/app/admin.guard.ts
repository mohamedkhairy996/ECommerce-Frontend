import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './services/user.service';
import { User } from './Models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private _userService: UserService) {}

  canActivate(): Observable<boolean> {
    return this._userService.getUser().pipe(
      map(user => {
        if (!user) {
          this.router.navigate(['/login']);
          return false;
        }

        // ✅ صحح الشرط: لو مش أدمن → منع
        if (!user.role.includes('Admin')) {
          this.router.navigate(['/unauthorized']);
          return false;
        }

        // ✅ لو أدمن → السماح
        return true;
      })
    );
  }
}