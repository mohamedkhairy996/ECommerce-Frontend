import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryResponse } from '../models/category-response';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  getCategories(parentId : number): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${environment.apiUrl}/SubCategories/${parentId}`);
  }
}
