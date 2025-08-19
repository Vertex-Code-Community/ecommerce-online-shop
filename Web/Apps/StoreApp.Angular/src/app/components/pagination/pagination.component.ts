import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface PageItem {
  type: 'page' | 'ellipsis';
  number?: number;
  isActive?: boolean;
}

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {

    @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;
  @Input() currentPage: number = 1;
  @Input() pageSizeOptions: number[] = [5, 10, 20, 50];
  @Input() showPageSizeSelector: boolean = true;
  @Input() boundaryLinks: boolean = true;
  @Input() directionLinks: boolean = true;
  @Input() maxPagesToShow: number = 5;
  @Input() disabled: boolean = false;
  @Input() showTotals: boolean = true;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  get totalPages(): number {
    if (!this.pageSize || this.pageSize <= 0) {
      return 0;
    }
    return Math.max(0, Math.ceil(this.totalItems / this.pageSize));
  }

  get isFirstPage(): boolean {
    return this.currentPage <= 1;
  }

  get isLastPage(): boolean {
    return this.currentPage >= this.totalPages;
  }

  get fromItem(): number {
    if (this.totalItems === 0) return 0;
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get toItem(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }

  onSelectPageSize(newSize: number): void {
    if (this.disabled) return;
    if (newSize === this.pageSize) return;
    this.pageSize = newSize;
    this.currentPage = 1;
    this.pageSizeChange.emit(newSize);
  }

  goToFirst(): void {
    if (this.disabled || this.isFirstPage) return;
    this.goToPage(1);
  }

  goToPrevious(): void {
    if (this.disabled || this.isFirstPage) return;
    this.goToPage(this.currentPage - 1);
  }

  goToNext(): void {
    if (this.disabled || this.isLastPage) return;
    this.goToPage(this.currentPage + 1);
  }

  goToLast(): void {
    if (this.disabled || this.isLastPage) return;
    this.goToPage(this.totalPages);
  }

  goToPage(page: number): void {
    if (this.disabled) return;
    const target = Math.max(1, Math.min(this.totalPages, page));
    if (target === this.currentPage) return;
    this.currentPage = target;
    this.pageChange.emit(target);
  }

  get pageItems(): PageItem[] {
    const pages: PageItem[] = [];
    const total = this.totalPages;
    const max = Math.max(3, this.maxPagesToShow);

    if (total <= 1) {
      return pages;
    }

    const addPage = (n: number) => {
      pages.push({ type: 'page', number: n, isActive: n === this.currentPage });
    };
    const addEllipsis = () => pages.push({ type: 'ellipsis' });

    if (total <= max) {
      for (let i = 1; i <= total; i++) addPage(i);
      return pages;
    }

    const half = Math.floor(max / 2);
    let start = Math.max(1, this.currentPage - half);
    let end = Math.min(total, start + max - 1);

    if (end - start + 1 < max) {
      start = Math.max(1, end - max + 1);
    }

    if (start > 1) {
      addPage(1);
      if (start > 2) addEllipsis();
    }

    for (let i = start; i <= end; i++) addPage(i);

    if (end < total) {
      if (end < total - 1) addEllipsis();
      addPage(total);
    }

    return pages;
  }
}


