import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-product-item',
  imports: [CommonModule],
  templateUrl: './product-item.component.html',
  standalone: true,
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {

  baseUrl = environment.baseUrl;

  @Input() product!: Product;
  @Output() editProductClicked = new EventEmitter<Product>();
  @Output() deleteProductClicked = new EventEmitter<Product>();

  onEditClick(event: Event): void {
    this.editProductClicked.emit(this.product);
  }

  onDeleteClick(event: Event): void {
    this.deleteProductClicked.emit(this.product);
  }
}
