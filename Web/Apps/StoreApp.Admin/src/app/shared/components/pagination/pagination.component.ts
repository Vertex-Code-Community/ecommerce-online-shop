import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BchSelectComponent } from '../bch-select/bch-select.component';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, BchSelectComponent],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit, OnDestroy {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Input() totalItems!: number;
  @Input() pageSize!: number;
  @Input() maxVisiblePages: number = 5;
  @Input() maxVisiblePagesMobile: number = 3;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  pageSizeOptions = [5, 10, 20, 50, 100];

  private resizeListener = () => {
    this.cdr.markForCheck();
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener);
  }

  get isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  get effectiveMaxVisiblePages(): number {
    return this.isMobile ? this.maxVisiblePagesMobile : this.maxVisiblePages;
  }

  get visiblePages(): number[] {
    const maxVisible = this.effectiveMaxVisiblePages;

    if (this.totalPages <= maxVisible) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  get hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  get hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }

  onPageClick(page: number): void {
    if (page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  onFirstPage(): void {
    if (this.hasPreviousPage) {
      this.pageChange.emit(1);
    }
  }

  onLastPage(): void {
    if (this.hasNextPage) {
      this.pageChange.emit(this.totalPages);
    }
  }

  onPreviousPage(): void {
    if (this.hasPreviousPage) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  onNextPage(): void {
    if (this.hasNextPage) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  onPageSizeChange(newPageSize: number | number[]): void {
    if (Array.isArray(newPageSize)) {
      newPageSize = newPageSize[0];
    }

    this.pageSizeChange.emit(newPageSize);
  }
}
