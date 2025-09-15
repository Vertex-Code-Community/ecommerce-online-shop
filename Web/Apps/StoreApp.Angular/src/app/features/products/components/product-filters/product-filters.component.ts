import { Component } from '@angular/core';
import {SizeOption, SizeSelectorComponent} from '../../../../shared/components/size-selector/size-selector.component';
import {
  ColorOption,
  ColorSelectorComponent
} from '../../../../shared/components/color-selector/color-selector.component';
import {
  CollapsibleSectionComponent
} from '../../../../shared/components/collapsible-section-component/collapsible-section.component';
import {CustomSliderComponent} from '../../../../shared/components/custom-slider/custom-slider.component';

@Component({
  selector: 'app-product-filters',
  imports: [
    ColorSelectorComponent,
    SizeSelectorComponent,
    CollapsibleSectionComponent,
    CustomSliderComponent
  ],
  templateUrl: './product-filters.component.html',
  standalone: true,
  styleUrl: './product-filters.component.scss'
})
export class ProductFiltersComponent {
  colors: ColorOption[] = [
    { name: 'Green', hexCode: '#00C853' },
    { name: 'Red', hexCode: '#D50000' },
    { name: 'Yellow', hexCode: '#FFD600' },
    { name: 'Blue', hexCode: '#00B0FF' },
    { name: 'Indigo', hexCode: '#3D5AFE' },
    { name: 'Purple', hexCode: '#AA00FF' },
    { name: 'Pink', hexCode: '#FF4081' },
    { name: 'White', hexCode: '#FFFFFF' },
    { name: 'Black', hexCode: '#000000' },
  ];

  sizes: SizeOption[] = [
    { name: 'XX-Small' }, { name: 'X-Small' },
    { name: 'Small' }, { name: 'Medium' },
    { name: 'Large' }, { name: 'X-Large' },
    { name: 'XX-Large' }, { name: '3X-Large' },
    { name: '4X-Large' }
  ];
}
