import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {environment} from '../../../../../environments/environment';
import {ProductService} from '../../../../core/services/product.service';
import {FileInputComponent} from '../../../../shared/components/file-input/file-input.component';
import {Product} from '../../../../shared/models/product.model';

@Component({
  selector: 'app-product-form-page',
  imports: [CommonModule, ReactiveFormsModule, FileInputComponent],
  templateUrl: './product-form-page.html',
  standalone: true,
  styleUrl: './product-form-page.css'
})
export class ProductFormPage implements OnInit {

  baseUrl = environment.baseUrl;
  productForm!: FormGroup;
  isEditMode = false;
  productId?: number;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0.01)]],
      imageData: [null]
    });

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.productId = +idParam;
        this.loadProduct(this.productId);
      }
    });
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe(product => {
      this.productForm.patchValue(product);
    });
  }

  onFileSelected(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      this.productForm.patchValue({ imageData: base64 });
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    const product: Product = this.productForm.value;

    if (this.isEditMode && this.productId != null) {
      this.productService.updateProductById(this.productId, product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.addProduct(product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }

  onGoBack() {
    this.router.navigate(['/products']);
  }
}
