import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../Models/stock';
import { Product } from '../../Models/product';
import { ProductDTO } from '../../Models/productDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {

previewUrl: string | ArrayBuffer | null = null;
productForm!: FormGroup;
stocks : Stock[] = [];
product: ProductDTO = {} as ProductDTO ;
  

  constructor(private fb: FormBuilder , private _productService:ProductService 
    , private stockService:StockService ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      storeQuantities: this.fb.array([]), // ده اللي هيمثل علاقة المنتج مع المخازن
      image: [null]
    });
    this.stockService.getAllStocks().subscribe({
  next: (data) => {
    this.stocks = data;
    console.log(data);
    this.initStocks(this.stocks); // ⬅️ هنا
  },
  error: (err) => {
    console.log(err);
  }
});

  }

  get storeQuantities(): FormArray {
  return this.productForm.get('storeQuantities') as FormArray;
}

  private initStocks(stocks: Stock[]): void {
  stocks.forEach(stock => {
    this.storeQuantities.push(this.fb.group({
      storeId: [stock.id],
      quantity: [0]   // يبدأ بـ 0
    }));
  });
}



  
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({ image: file });
      this.productForm.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      // هنا ممكن تستخدم الـ service بتاعتك عشان تبعت الداتا
      let data = this.productForm.value as ProductDTO;
      const formData = new FormData();
formData.append("name", data.name);
formData.append("description", data.description);
formData.append("price", data.price.toString());

// 👇 لازم تبعت JSON string للـ StoreQuantities
formData.append("storeQuantities", JSON.stringify(data.storeQuantities));

// 👇 لازم تكون الـ image من نوع File (من input[type=file])
formData.append("imageFile", this.productForm.get('image')?.value);

this._productService.addProduct(formData)
  .subscribe({
    next: (res) => 
      Swal.fire({
            title: 'تم الإضافة!',
            text: 'تم إضافة المنتج بنجاح.',
            icon: 'success',
            timer: 1500, // يختفي بعد 1.5 ثانية
            showConfirmButton: false, // مفيش زر OK — يشتغل تلقائي
            toast: true, // يظهر كـ notification صغيرة
            position: 'top-end', // في الأعلى جهة اليمين
            customClass: {
              popup: 'swal-toast' // ل
            }
}),
    error: (err) => console.error("❌ Error", err)
    
  });
     
      // هنا تبعت الـ data للـ API
    } else {
      this.productForm.markAllAsTouched();
    }
  }


}
