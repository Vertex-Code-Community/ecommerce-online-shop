import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormInputComponent } from '../../../shared/components/form-input/form-input.component';
import { FormTextareaComponent } from '../../../shared/components/form-textarea/form-textarea.component';
import { UpdateProduct } from '../../../shared/models/product/updateProduct';
import * as ProductActions from '../../../store/products/product.actions';
import * as ProductSelectors from '../../../store/products/product.selectors';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormInputComponent, FormTextareaComponent],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);

  productForm!: FormGroup;
  isEditMode = false;
  productId: number | null = null;
  loading$ = this.store.select(ProductSelectors.selectProductLoading);

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  private initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      discount: [0, [Validators.min(0), Validators.max(1)]],
      unitsInStock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  private checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productId = +id;
      this.loadProductForEdit();
    }
  }

  private loadProductForEdit(): void {
    if (this.productId) {
      this.store.dispatch(ProductActions.loadProduct({ id: this.productId }));
      this.store.select(ProductSelectors.selectCurrentProduct).subscribe(product => {
        if (product) {
          this.productForm.patchValue({
            name: product.name,
            description: product.description || '',
            price: product.price,
            discount: product.discount || 0,
            unitsInStock: product.unitsInStock
          });
        }
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      
      if (this.isEditMode && this.productId) {
        const updateProduct: UpdateProduct = {
          id: this.productId,
          ...formValue
        };
        this.store.dispatch(ProductActions.updateProduct(updateProduct));
      } else {
        this.store.dispatch(ProductActions.addProduct(formValue));
      }
      
      this.router.navigate(['/products']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }

  getFieldError(fieldName: string): string {
    const field = this.productForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return 'This field is required';
      if (field.errors['minlength']) return `Minimum length is ${field.errors['minlength'].requiredLength}`;
      if (field.errors['min']) return `Minimum value is ${field.errors['min'].min}`;
      if (field.errors['max']) return `Maximum value is ${field.errors['max'].max}`;
    }
    return '';
  }
}
