import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {
  @Input() min: number = 1;
  @Input() max: number = 10;
  @Input() value: number = 1;
  @Output() valueChanged = new EventEmitter<number>();

  increment(): void {
    if (this.value < this.max) {
      const newValue = this.value + 1;
      this.valueChanged.emit(newValue);
    }
  }

  decrement(): void {
    if (this.value > this.min) {
      const newValue = this.value - 1;
      this.valueChanged.emit(newValue);
    }
  }

  get canIncrement(): boolean {
    return this.value < this.max;
  }

  get canDecrement(): boolean {
    return this.value > this.min;
  }
}