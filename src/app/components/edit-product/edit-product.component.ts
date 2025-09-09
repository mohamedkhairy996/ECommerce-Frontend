import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { StockService } from '../../services/stock.service';
import { Product } from '../../Models/product';
import { Stock } from '../../Models/stock';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
  imports: [CommonModule, ReactiveFormsModule]
})
export class EditProductComponent implements OnInit {

  productForm!: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  stocks: Stock[] = [];
  productId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private stockService: StockService
  ) { }

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      storeQuantities: this.fb.array([])
    });
    forkJoin({
      product: this.productService.getProductByIdWithStores(this.productId),
      allStores: this.stockService.getAllStocks()
    }).subscribe({
      next: ({ product, allStores }) => {
        this.stocks = allStores || [];
        
        this.productForm.patchValue({
          name: product.name || '',
          description: product.description || '',
          price: product.price || 0
        });

        console.log(product);
        console.log(allStores);

        if (product.imageData) {
          this.previewUrl = 'data:image/png;base64,' + product.imageData;
        }

        // ✅ التعديل الأساسي هنا
        const productStocks = Array.isArray(product.stocks) ? product.stocks : [];

        allStores.forEach(store => {
          const currentQuantity = productStocks.find(ps => ps.stockId === store.id)?.quantity || 0;

          this.storeQuantities.push(this.fb.group({
            storeId: [store.id, Validators.required],
            quantity: [currentQuantity, [Validators.required, Validators.min(0)]]
          }));
        });
      },
      error: (err) => {
        console.error('Error fetching data:', err);
        Swal.fire({
          icon: 'error',
          title: 'فشل تحميل البيانات',
          text: 'حدث خطأ أثناء تحميل بيانات المنتج. يرجى المحاولة لاحقاً.',
          confirmButtonText: 'فهمت'
        });
      }
    });
  }

  get storeQuantities(): FormArray {
    return this.productForm.get('storeQuantities') as FormArray;
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ في البيانات',
        text: 'يرجى ملء جميع الحقول المطلوبة بشكل صحيح.',
        confirmButtonText: 'فهمت'
      });
      return;
    }

    const formValue = this.productForm.value;
    const formData = new FormData();

    formData.append("id", this.productId.toString());
    formData.append("name", formValue.name);
    formData.append("description", formValue.description);
    formData.append("price", formValue.price.toString());
    formData.append("storeQuantities", JSON.stringify(formValue.storeQuantities));

    if (this.selectedFile) {
      formData.append("imageFile", this.selectedFile, this.selectedFile.name);
    }

    this.productService.updateProduct(this.productId, formData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'تم التعديل بنجاح!',
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigate(['/admin/products']);
      },
      error: (err) => {
        console.error('Update failed:', err);
        Swal.fire({
          icon: 'error',
          title: 'فشل الحفظ',
          text: 'حدث خطأ أثناء حفظ المنتج. يرجى المحاولة مرة أخرى.',
          confirmButtonText: 'فهمت'
        });
      }
    });
  }
}