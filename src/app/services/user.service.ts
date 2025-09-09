import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { environment } from '../../environments/environment.development';
import { GetUsersDTO } from '../Models/get-users-dto';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClient:HttpClient) { }

  signIn(user:User)
  {
    return this._httpClient.post(`${environment.baseUrl}/user/signin`,user,{
  withCredentials: true
    });
  }
  logOut()
  {
    return this._httpClient.post(`${environment.baseUrl}/User/Signout`,{},{
      withCredentials: true
        });
  }
  getUser()
  {
    return this._httpClient.get<User>(`${environment.baseUrl}/User/getSignedInUser`, { withCredentials: true });
  }
  // getUsers()
  // {
  //   return this._httpClient.get<GetUsersDTO>(`${environment.baseUrl}/User`, { withCredentials: true });
  // }

   getUsers(): Observable<User[]> {
    return this._httpClient.get<GetUsersDTO>(`${environment.baseUrl}/User`).pipe(
      map((res: GetUsersDTO) => {
        if (res.success && res.data) {
          return res.data.map((u: any) => ({
            id: u.id,
            username: u.userName,
            password: '', // سيبها فاضية أو null لو مش عايز تعرضها
            email: u.email,
            name: u.name,              // هنا بنحوّل fullName → Name
            address: u.address ?? '-',
            city: u.city ?? '-',
            phoneNumber: u.phoneNumber ?? '-',
            role: u.role ?? []
          })) as User[];
        }
        return [];
      })
    );
  }

  lockUnlockUser(id:string)
  {
    return this._httpClient.put(`${environment.baseUrl}/User/lock-unlock/${id}`,{}, { withCredentials: true });
  }

  register(user:User)
  {
    return this._httpClient.post(`${environment.baseUrl}/User`,user);
  }
  deleteUser(id:string)
  {
    return this._httpClient.delete(`${environment.baseUrl}/User/${id}`, { withCredentials: true });
  }

}
