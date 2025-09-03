import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../shared/models/product/product';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: true,
  imports: [
    DecimalPipe
  ]
})
export class ProductComponent {
  @Input() product!: Product;
  @Input() showAdminActions: boolean = false;
  @Output() cardClick = new EventEmitter<Product>();
  @Output() edit = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<Product>();

  onCardClick(): void {
    this.cardClick.emit(this.product);
  }

  onEditClick(event: MouseEvent): void {
    event.stopPropagation();
    this.edit.emit(this.product);
  }

  onDeleteClick(event: MouseEvent): void {
    event.stopPropagation();
    this.delete.emit(this.product);
  }
}
