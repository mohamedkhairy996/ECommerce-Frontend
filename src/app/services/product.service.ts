import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductResponseDto } from '../models/product-response-dto';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://testecom.egtrue.com/api/v2'; // Adjust your base API URL

  constructor(private http: HttpClient) {}

  // Helper to get headers with language
  private getHeaders(languageCode: string = 'en'): HttpHeaders {
    return new HttpHeaders({
      'Accept-Language': languageCode, // This header should match what your backend middleware expects
      // Add other common headers if needed, e.g., Authorization
      // 'Authorization': `Bearer ${this.tokenService.getToken()}`
    });
  }

  // 1. Get Product By ID
  // Note: The C# controller defaults page, storeId, userId to 1.
  // We'll pass them explicitly here to match the C# signature, but they might not be used in the GetById logic beyond pagination setup.
  getProductById(productId: number, page: number = 1, storeId: number = 1, userId: number = 1, languageCode: string = 'en'): Observable<ProductResponseDto> {
    const url = `${this.baseUrl}/products/${productId}`;
    const params = new HttpParams()
      .set('page', page.toString())
      .set('storeId', storeId.toString()) // Note: C# uses 'store_id', JS/TS convention is camelCase, but query string is case-sensitive. Check your backend expectation.
      .set('userId', userId.toString()); // Same here, 'user_id' vs 'userId'
    const headers = this.getHeaders(languageCode);

    return this.http.get<ProductResponseDto>(url, { params, headers });
  }

  // 2. Get Related Products
  getRelatedProducts(productId: number, page: number = 1, storeId: number = 1, userId: number = 1, languageCode: string = 'en'): Observable<ProductResponseDto> {
    const url = `${this.baseUrl}/products/related/${productId}`;
    const params = new HttpParams()
      .set('page', page.toString())
      .set('store_id', storeId.toString()) // Use snake_case to match C# controller
      .set('user_id', userId.toString()); // Use snake_case to match C# controller
    const headers = this.getHeaders(languageCode);

    return this.http.get<ProductResponseDto>(url, { params, headers });
  }

  // 3. Get Featured Products
  getFeaturedProducts(page: number = 1, languageCode: string = 'en'): Observable<ProductResponseDto> { 
    return this.http.get<ProductResponseDto>(`${environment.apiUrl}/products/featured?page=${page}`);
  }

  // 4. Get Best Seller Products
  getBestSellerProducts(storeId: number = 1, page: number = 1, languageCode: string = 'en'): Observable<ProductResponseDto> {
    return this.http.get<ProductResponseDto>(`${environment.apiUrl}/Products/best-seller?store_id=1&page=${page}`);
  }

  // 5. Get Today's Deal Products
  getTodaysDealProducts(page: number = 1, storeId: number = 1, userId: number = 1, languageCode: string = 'en'): Observable<ProductResponseDto> {
    const url = `${this.baseUrl}/products/todays-deal`;
    const params = new HttpParams()
      .set('page', page.toString())
      .set('store_id', storeId.toString())
      .set('user_id', userId.toString());
    const headers = this.getHeaders(languageCode);

    return this.http.get<ProductResponseDto>(url, { params, headers });
  }

  // 6. Get Products By Category
  getProductsByCategory(categoryId: number, page: number = 1, storeId: number = 1, userId: number = 1, languageCode: string = 'en'): Observable<ProductResponseDto> {
    const url = `${this.baseUrl}/products/category/${categoryId}`;
    const params = new HttpParams()
      .set('page', page.toString())
      .set('store_id', storeId.toString())
      .set('user_id', userId.toString());
    const headers = this.getHeaders(languageCode);

    return this.http.get<ProductResponseDto>(url, { params, headers });
  }

  // 7. Get Products By Brand
  getProductsByBrand(brandId: number, page: number = 1, storeId: number = 1, userId: number = 1, languageCode: string = 'en'): Observable<ProductResponseDto> {
    const url = `${this.baseUrl}/products/brand/${brandId}`;
    const params = new HttpParams()
      .set('page', page.toString())
      .set('store_id', storeId.toString())
      .set('user_id', userId.toString());
    const headers = this.getHeaders(languageCode);

    return this.http.get<ProductResponseDto>(url, { params, headers });
  }

  // 8. Get Products By Barcode
  getProductsByBarcode(barcode: string, languageCode: string = 'en'): Observable<ProductResponseDto> {
    const url = `${this.baseUrl}/products/match`;
    const params = new HttpParams()
      .set('parcode', barcode); // Note: 'parcode' matches the C# controller parameter name
    const headers = this.getHeaders(languageCode);

    return this.http.get<ProductResponseDto>(url, { params, headers });
  }

  // 9. Search Products By Name
  searchProductsByName(searchTerm: string, page: number = 1, storeId: number = 1, userId: number = 1, languageCode: string = 'en'): Observable<ProductResponseDto> {
    const url = `${this.baseUrl}/products/search`;
    const params = new HttpParams()
      .set('name', searchTerm) // Note: 'name' matches the C# controller parameter name
      .set('page', page.toString())
      .set('store_id', storeId.toString())
      .set('user_id', userId.toString());
    const headers = this.getHeaders(languageCode);

    return this.http.get<ProductResponseDto>(url, { params, headers });
  }

  // Example POST method (if needed for creating products)
  // createProduct(productData: ProductDataDto, languageCode: string = 'en'): Observable<ProductDataDto> {
  //   const url = `${this.baseUrl}/products`;
  //   const headers = this.getHeaders(languageCode);
  //   return this.http.post<ProductDataDto>(url, productData, { headers });
  // }

  // Example PUT method (if needed for updating products)
  // updateProduct(productId: number, productData: ProductDataDto, languageCode: string = 'en'): Observable<ProductDataDto> {
  //   const url = `${this.baseUrl}/products/${productId}`;
  //   const headers = this.getHeaders(languageCode);
  //   return this.http.put<ProductDataDto>(url, productData, { headers });
  // }

  // Example DELETE method (if needed for deleting products)
  // deleteProduct(productId: number, languageCode: string = 'en'): Observable<void> {
  //   const url = `${this.baseUrl}/products/${productId}`;
  //   const headers = this.getHeaders(languageCode);
  //   return this.http.delete<void>(url, { headers });
  // }
}