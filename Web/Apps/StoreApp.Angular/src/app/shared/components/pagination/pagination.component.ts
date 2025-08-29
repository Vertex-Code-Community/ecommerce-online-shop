import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface PageItem {
  type: 'page' | 'ellipsis';
  number?: number;
  isActive?: boolean;
}

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
    const total = this.totalItems || 0;
    const size = this.pageSize || 10;
    if (!size || size <= 0) {
      return 0;
    }
    return Math.max(0, Math.ceil(total / size));
  }

  get isFirstPage(): boolean {
    return (this.currentPage || 1) <= 1;
  }

  get isLastPage(): boolean {
    return (this.currentPage || 1) >= this.totalPages;
  }

  get fromItem(): number {
    const total = this.totalItems || 0;
    if (total === 0) return 0;
    const current = this.currentPage || 1;
    const size = this.pageSize || 10;
    return (current - 1) * size + 1;
  }

  get toItem(): number {
    const total = this.totalItems || 0;
    const current = this.currentPage || 1;
    const size = this.pageSize || 10;
    return Math.min(current * size, total);
  }

  onSelectPageSize(newSize: number): void {
    if (this.disabled || !newSize) return;
    this.pageSizeChange.emit(newSize);
  }

  goToFirst(): void {
    if (this.disabled || this.isFirstPage) return;
    this.goToPage(1);
  }

  goToPrevious(): void {
    if (this.disabled || this.isFirstPage) return;
    const current = this.currentPage || 1;
    this.goToPage(current - 1);
  }

  goToNext(): void {
    if (this.disabled || this.isLastPage) return;
    const current = this.currentPage || 1;
    this.goToPage(current + 1);
  }

  goToLast(): void {
    if (this.disabled || this.isLastPage) return;
    this.goToPage(this.totalPages);
  }

  goToPage(page: number): void {
    if (this.disabled || !page) return;
    const target = Math.max(1, Math.min(this.totalPages, page));
    const current = this.currentPage || 1;
    if (target === current) return;
    this.pageChange.emit(target);
  }

  get pageItems(): PageItem[] {
    const pages: PageItem[] = [];
    const total = this.totalPages;
    const max = Math.max(3, this.maxPagesToShow || 5);

    if (total <= 1) {
      return pages;
    }

    const addPage = (n: number) => {
      const current = this.currentPage || 1;
      pages.push({ type: 'page', number: n, isActive: n === current });
    };
    const addEllipsis = () => pages.push({ type: 'ellipsis' });

    if (total <= max) {
      for (let i = 1; i <= total; i++) addPage(i);
      return pages;
    }

    const half = Math.floor(max / 2);
    const current = this.currentPage || 1;
    let start = Math.max(1, current - half);
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
