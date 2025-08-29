import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AppState } from '../../../../store/app.state';
import * as ProductActions from '../../../../store/products/product.actions';
import { selectCurrentProduct } from '../../../../store/products/product.selectors';
import {FileInputComponent} from '../../../../shared/components/file-input/file-input.component';
import {environment} from '../../../../../environments/environment';
import {FullProduct} from '../../../../shared/models/product/fullProduct';
import {UpdateProduct} from '../../../../shared/models/product/updateProduct';

@Component({
  selector: 'app-product-form-page',
  imports: [CommonModule, ReactiveFormsModule, FileInputComponent],
  templateUrl: './product-form-page.html',
  standalone: true,
  styleUrls: ['./product-form-page.css']
})
export class ProductFormPage implements OnInit {

  private store = inject(Store<AppState>);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  productForm!: FormGroup;
  isEditMode = false;
  productId?: number;

  product$: Observable<FullProduct | null> = this.store.select(selectCurrentProduct);

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0.01)]],
      imageData: [null],
      imageUrl: ['']
    });

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.productId = +idParam;
        this.store.dispatch(ProductActions.loadProduct({ id: this.productId }));

        this.product$.pipe(
          tap(product => {
            if (product) {
              this.productForm.patchValue(product);
            }
          })
        ).subscribe();
      }
    });
  }

  onFileSelected(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string);
      this.productForm.patchValue({ imageData: base64 });
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    const product: UpdateProduct = this.productForm.value;

    if (this.isEditMode && this.productId != null) {
      this.store.dispatch(ProductActions.updateProduct(product));
    } else {
      this.store.dispatch(ProductActions.addProduct(product));
    }

    this.router.navigate(['/products']);
  }

  onGoBack() {
    this.router.navigate(['/products']);
  }
}
