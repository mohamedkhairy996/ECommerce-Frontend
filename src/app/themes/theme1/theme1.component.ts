import { Component } from '@angular/core';
import { CustTopbarComponent } from "../../Components/customer/cust-topbar/cust-topbar.component";
import { CustHeaderComponent } from "../../Components/customer/cust-header/cust-header.component";
import { CustNavbarComponent } from "../../Components/customer/cust-navbar/cust-navbar.component";
import { CustSliderComponent } from "../../Components/customer/cust-slider/cust-slider.component";
import { CustCategoriesComponent } from "../../Components/customer/cust-categories/cust-categories.component";
import { CustProductsComponent } from "../../Components/customer/cust-products/cust-products.component";
import { CustFooterComponent } from "../../Components/customer/cust-footer/cust-footer.component";
import { CustBannerComponent } from "../../Components/customer/cust-banner/cust-banner.component";
import { CustSubCategoriesComponent } from '../../Components/customer/cust-sub-categories/cust-sub-categories.component';
import { CustBanner2Component } from "../../Components/customer/cust-banner2/cust-banner2.component";
import { CustFeaturedProductsComponent } from "../../Components/customer/cust-featured-products/cust-featured-products.component";
import { CustBanner3Component } from "../../Components/customer/cust-banner3/cust-banner3.component";
import { CustToDayDealsProductsComponent } from "../../Components/customer/cust-to-day-deals-products/cust-to-day-deals-products.component";
import { CustBestSellerProductsComponent } from "../../Components/customer/cust-best-seller-products/cust-best-seller-products.component";

@Component({
  selector: 'app-theme1',
  imports: [CustTopbarComponent, CustHeaderComponent, CustNavbarComponent, CustSliderComponent, CustCategoriesComponent, CustFooterComponent, CustSubCategoriesComponent, CustBannerComponent, CustBanner2Component, CustFeaturedProductsComponent, CustBanner3Component, CustToDayDealsProductsComponent, CustBestSellerProductsComponent],
  templateUrl: './theme1.component.html',
  styleUrl: '../../../assets/css/main.css'
})
export class Theme1Component {

}
