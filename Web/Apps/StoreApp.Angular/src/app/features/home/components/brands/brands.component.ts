import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface BrandItem {
  name: string;
  svgPath: string;
  maxWidth: string;
  maxHeight: string;
}

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {
  @Input() brands: BrandItem[] = [];
}
