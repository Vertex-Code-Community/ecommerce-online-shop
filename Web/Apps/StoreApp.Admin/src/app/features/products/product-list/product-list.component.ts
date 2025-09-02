import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { Product } from '../../../shared/models/product/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [ProductComponent]
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Input() headerText: string = '';
  @Input() showViewAllButton: boolean = true;
  @Input() isScrollable: boolean = false;
  @Input() showCreateButton: boolean = false;
  @Input() showAdminActions: boolean = false;

  @Output() productClick = new EventEmitter<Product>();
  @Output() viewAllClick = new EventEmitter<void>();
  @Output() createClick = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<Product>();

  onProductClick(product: Product): void {
    this.productClick.emit(product);
  }

  onViewAllClick(): void {
    this.viewAllClick.emit();
  }

  onCreateClick(): void {
    this.createClick.emit();
  }

  onEdit(product: Product): void {
    this.edit.emit(product);
  }

  onDelete(product: Product): void {
    this.delete.emit(product);
  }
}
