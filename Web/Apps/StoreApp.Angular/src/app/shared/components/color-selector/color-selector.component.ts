import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ColorOption {
  name: string;
  hexCode: string;
}

@Component({
  selector: 'app-color-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './color-selector.component.html',
  styleUrl: './color-selector.component.scss'
})
export class ColorSelectorComponent {
  @Input() colors: ColorOption[] = [];
  @Input() selectedColor: string | null = null; // hexCode of selected color
  @Input() label: string = 'Select Colors';
  @Output() colorSelected = new EventEmitter<ColorOption>();

  onColorSelect(color: ColorOption): void {
    this.selectedColor = color.hexCode;
    this.colorSelected.emit(color);
  }

  isSelected(color: ColorOption): boolean {
    return this.selectedColor === color.hexCode;
  }
}