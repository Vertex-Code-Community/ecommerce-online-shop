import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {
  brands = [
    { name: 'Versace', svgPath: '/svg/versace.svg', maxWidth: '167px', maxHeight: '34px' },
    { name: 'Zara', svgPath: '/svg/zara.svg', maxWidth: '92px', maxHeight: '38px' },
    { name: 'Gucci', svgPath: '/svg/gucci.svg', maxWidth: '157px', maxHeight: '36px' },
    { name: 'Prada', svgPath: '/svg/prada.svg', maxWidth: '195px', maxHeight: '32px' },
    { name: 'Calvin Klein', svgPath: '/svg/calvin-klein.svg', maxWidth: '208px', maxHeight: '34px' }
  ];
}
