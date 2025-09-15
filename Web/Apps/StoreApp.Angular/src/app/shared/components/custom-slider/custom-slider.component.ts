import { Component, EventEmitter, Input, Output } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-custom-slider',
  templateUrl: './custom-slider.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgStyle
  ],
  styleUrl: './custom-slider.component.scss'
})
export class CustomSliderComponent {
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() mode: 'single' | 'range' = 'single';
  @Input() showValues = true;

  @Input() value = 50;
  @Input() valueRange: [number, number] = [20, 80];

  @Output() valueChange = new EventEmitter<number>();
  @Output() valueRangeChange = new EventEmitter<[number, number]>();

  onValueChange(event: Event) {
    const newVal = +(event.target as HTMLInputElement).value;
    this.value = newVal;
    this.valueChange.emit(this.value);
  }

  onRangeChange(index: number, event: Event) {
    const newVal = +(event.target as HTMLInputElement).value;
    this.valueRange[index] = newVal;

    if (this.valueRange[0] > this.valueRange[1]) {
      this.valueRange = [...this.valueRange].sort((a, b) => a - b) as [number, number];
    }

    this.valueRangeChange.emit(this.valueRange);
  }

  getPercentage(val: number): number {
    return ((val - this.min) / (this.max - this.min)) * 100;
  }
}
