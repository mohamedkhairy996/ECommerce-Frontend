import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { AddStockComponent } from './components/add-stock/add-stock.component';
import { OrderComponent } from './components/order/order.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ProductsComponent } from './components/products/products.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AboutComponent } from './components/about/about.component';
import { dash } from 'ngx-bootstrap-icons';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { AdminGuard } from './admin.guard';

export const routes: Routes = [
     {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'orders', component: OrderComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkOut', component: CheckOutComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'about', component: AboutComponent },
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'addProduct', component: AddProductComponent },
      { path: 'editproduct/:id', component: EditProductComponent },
      { path: 'addstock', component: AddStockComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'orders', component: OrderComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: 'orderDetails/:id', component: OrderDetailsComponent },

    ]
  },
  { path: '**', component: NotFoundComponent }
];
