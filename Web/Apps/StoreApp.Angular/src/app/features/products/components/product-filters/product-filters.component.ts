import {Component, inject, OnInit} from '@angular/core';
import {SizeOption, SizeSelectorComponent} from '../../../../shared/components/size-selector/size-selector.component';
import {
  ColorOption,
  ColorSelectorComponent
} from '../../../../shared/components/color-selector/color-selector.component';
import {
  CollapsibleSectionComponent
} from '../../../../shared/components/collapsible-section-component/collapsible-section.component';
import {CustomSliderComponent} from '../../../../shared/components/custom-slider/custom-slider.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.state';
import {selectFilters} from '../../../../store/products/product.selectors';
import {setFilters} from '../../../../store/products/product.actions';

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
  private store = inject(Store<AppState>);
  filters$ = this.store.select(selectFilters);
  selectedColor: string | null = null;
  selectedSize: string | null = null;
  priceRange: [number, number] = [0, 10000];

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
    { name: 'XXS' }, { name: 'XX' },
    { name: 'S' }, { name: 'M' },
    { name: 'L' }, { name: 'XL' },
    { name: 'XXL' }, { name: '3XL' },
    { name: '4XL' }
  ];

  onColorSelected(color: ColorOption) {
    this.selectedColor = color.hexCode;
  }

  onSizeSelected(size: SizeOption) {
    this.selectedSize = size.name;
  }

  onPriceRangeChange(range: number[]) {
    this.priceRange = range as [number, number];
  }

  onClearFilters() {
  }

  onApplyFilters() {
    const filters : Record<string, string> = {
      minPrice: this.priceRange[0].toString(),
      maxPrice: this.priceRange[1].toString()
    };

    if (this.selectedColor) {
      filters['color'] = this.selectedColor;
    }

    if (this.selectedSize) {
      filters['size'] = this.selectedSize;
    }

    this.store.dispatch(setFilters({ filters }) );
  }
}
