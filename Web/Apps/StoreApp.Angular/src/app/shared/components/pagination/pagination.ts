import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-store-pagination',
  imports: [],
  templateUrl: './pagination.html',
  standalone: true,
  styleUrl: './pagination.scss'
})
export class Pagination {
  @Input() totalPages = 1;
  @Input() currentPage = 1;

  @Output() pageChange = new EventEmitter<number>();

  get pages(): (number | string)[] {
    const pages: (number | string)[] = [];
    if (this.totalPages <= 7) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        pages.push(1, 2, 3, '...', this.totalPages - 1, this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push(1, 2, '...', this.totalPages - 2, this.totalPages - 1, this.totalPages);
      } else {
        pages.push(1, '...', this.currentPage - 1, this.currentPage, this.currentPage + 1, '...', this.totalPages);
      }
    }
    return pages;
  }

  onPageClick(page: number | string) {
    if (typeof page === 'number' && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  onPrevClick() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  onNextClick() {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }
}
