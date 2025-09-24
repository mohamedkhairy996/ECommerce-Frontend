import { Component } from '@angular/core';
import { CustTopbarComponent } from "../../app/Components/customer/cust-topbar/cust-topbar.component";
import { CustHeaderComponent } from "../../app/Components/customer/cust-header/cust-header.component";
import { CustNavbarComponent } from "../../app/Components/customer/cust-navbar/cust-navbar.component";
import { RouterOutlet } from "../../../node_modules/@angular/router/router_module.d-Bx9ArA6K";
import { CustFooterComponent } from "../../app/Components/customer/cust-footer/cust-footer.component";

@Component({
  selector: 'app-customer-layout',
  imports: [CustTopbarComponent, CustHeaderComponent, CustNavbarComponent, RouterOutlet, CustFooterComponent],
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.css'
})
export class CustomerLayoutComponent {

}
