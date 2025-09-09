import { Component } from '@angular/core';
import { AdminHeaderComponent } from "../../components/admin-header/admin-header.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-admin-layout',
  imports: [AdminHeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
