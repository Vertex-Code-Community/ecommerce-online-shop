import {Component, Input, Output, EventEmitter, inject} from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { Product } from '../../models/product/product';
import {LoadingIndicatorComponent} from '../loading-indicator/loading-indicator.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [ProductComponent, LoadingIndicatorComponent]
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Input() headerText: string = '';
  @Input() showViewAllButton: boolean = true;
  @Input() isScrollable: boolean = false;
  @Input() isLoading: boolean = false;

  @Output() viewAllClick = new EventEmitter<void>();

  private router: Router = inject(Router);

  onProductClick(product: Product): void {
    this.router.navigate(['/products', product.id]);
  }

  onViewAllClick(): void {
    this.viewAllClick.emit();
  }
}
