import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SizeOption {
  name: string;
  description?: string;
}

@Component({
  selector: 'app-size-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './size-selector.component.html',
  styleUrl: './size-selector.component.scss'
})
export class SizeSelectorComponent {
  @Input() sizes: SizeOption[] = [];
  @Input() selectedSize: string | null = null;
  @Input() label: string = 'Select Size';
  @Output() sizeSelected = new EventEmitter<SizeOption>();

  onSizeSelect(size: SizeOption): void {
    this.selectedSize = size.name;
    this.sizeSelected.emit(size);
  }

  isSelected(size: SizeOption): boolean {
    return this.selectedSize === size.name;
  }
}
