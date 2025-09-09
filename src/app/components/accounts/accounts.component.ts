import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { User } from '../../Models/user';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-users',
  imports: [CommonModule , MatTableModule,
MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'address', 'city', 'phoneNumber', 'actions'];
  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.dataSource.data = users;
        console.log(users);
      },
      error: (err) => {
        console.error('Failed to load users', err);
        // يمكنك إضافة رسالة خطأ للمستخدم هنا
      }
    });
  }

  createNewUser() {
    this.router.navigate(['/register']);
  }


  editUser(id: string) {
    this.userService.lockUnlockUser(id).subscribe({
      next: () => {
       Swal.fire({
        icon: 'success',
        title: 'User lock/unlock status changed successfully',
        showConfirmButton: false,
        timer: 2000
      });
  },
      error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Failed to change user lock/unlock status',
            showConfirmButton: false,
            timer: 2000
});
  }});
  }
  deleteUser(id: string) {
    Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to delete this user?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'User deleted successfully',
            timer: 2000,
            showConfirmButton: false
          });
          this.loadUsers();
        },
        error: (err) => {
          console.error('Failed to delete user', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to delete user'
          });
        }
      });
    }
  });
  }
}