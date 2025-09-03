import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.scss'
})
export class ImageGalleryComponent implements OnInit, OnChanges {
  @Input() images: string[] = [];
  @Input() initialImageIndex: number = 0;

  selectedIndex: number = 0;
  visibleStartIndex: number = 0;
  maxVisibleThumbnails: number = 3;

  ngOnInit(): void {
    this.setInitialImage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'] || changes['initialImageIndex']) {
      this.setInitialImage();
    }
  }

  private setInitialImage(): void {
    if (this.images.length > 0) {
      const index = Math.max(0, Math.min(this.initialImageIndex, this.images.length - 1));
      this.selectImage(index);
    }
  }

  get displayMode(): 'single' | 'simple' | 'gallery' {
    if (this.images.length <= 1) return 'single';
    if (this.images.length <= 3) return 'simple';
    return 'gallery';
  }

  get visibleThumbnails(): string[] {
    if (this.displayMode === 'gallery') {
      return this.images.slice(this.visibleStartIndex, this.visibleStartIndex + this.maxVisibleThumbnails);
    }
    return this.images;
  }

  get visibleThumbnailsWithIndex(): Array<{image: string, originalIndex: number}> {
    return this.visibleThumbnails.map((image, index) => ({
      image,
      originalIndex: this.visibleStartIndex + index
    }));
  }

  get canNavigatePrev(): boolean {
    return this.displayMode === 'gallery' && this.images.length > 1;
  }

  get canNavigateNext(): boolean {
    return this.displayMode === 'gallery' && this.images.length > 1;
  }

  get canNavigateThumbnailsPrev(): boolean {
    return this.displayMode === 'gallery' && this.visibleStartIndex > 0;
  }

  get canNavigateThumbnailsNext(): boolean {
    return this.displayMode === 'gallery' && 
           this.visibleStartIndex + this.maxVisibleThumbnails < this.images.length;
  }

  get selectedImage(): string {
    return this.images[this.selectedIndex] || '';
  }

  selectImage(index: number): void {
    if (index >= 0 && index < this.images.length) {
      this.selectedIndex = index;
      this.ensureSelectedImageVisible();
    }
  }

  private ensureSelectedImageVisible(): void {
    if (this.displayMode !== 'gallery') return;

    if (this.selectedIndex < this.visibleStartIndex) {
      this.visibleStartIndex = this.selectedIndex;
    }
    else if (this.selectedIndex >= this.visibleStartIndex + this.maxVisibleThumbnails) {
      this.visibleStartIndex = this.selectedIndex - this.maxVisibleThumbnails + 1;
    }
  }

  navigatePrev(): void {
    if (this.canNavigatePrev) {
      const newIndex = this.selectedIndex === 0 
        ? this.images.length - 1 
        : this.selectedIndex - 1;
      this.selectImage(newIndex);
    }
  }

  navigateNext(): void {
    if (this.canNavigateNext) {
      const newIndex = this.selectedIndex === this.images.length - 1 
        ? 0 
        : this.selectedIndex + 1;
      this.selectImage(newIndex);
    }
  }

  isSelected(index: number): boolean {
    return this.selectedIndex === index;
  }
}