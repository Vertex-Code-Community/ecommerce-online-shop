import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageGalleryComponent } from '../image-gallery/image-gallery.component';
import { ProductRatingComponent } from '../../../../shared/components/product-rating/product-rating.component';
import { ProductPriceComponent } from '../../../../shared/components/product-price/product-price.component';
import { ColorSelectorComponent, ColorOption } from '../../../../shared/components/color-selector/color-selector.component';
import { SizeSelectorComponent, SizeOption } from '../../../../shared/components/size-selector/size-selector.component';
import { CounterComponent } from '../../../../shared/components/counter/counter.component';
import { FullProduct } from '../../../../shared/models/product/fullProduct';
import { ProductDetail } from '../../../../shared/models/product/productDetail';

export interface ProductSelection {
  productId: number;
  quantity: number;
  selectedProductDetail: ProductDetail | null;
}

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [
    CommonModule,
    ImageGalleryComponent,
    ProductRatingComponent,
    ProductPriceComponent,
    ColorSelectorComponent,
    SizeSelectorComponent,
    CounterComponent
  ],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss'
})
export class ProductInfoComponent implements OnInit, OnChanges {
  @Input() fullProduct!: FullProduct;
  @Output() addToCartClicked = new EventEmitter<ProductSelection>();

  selectedColor: ColorOption | null = null;
  selectedSize: SizeOption | null = null;
  selectedProductDetail: ProductDetail | null = null;
  quantity: number = 1;

  availableColors: ColorOption[] = [];
  availableSizes: SizeOption[] = [];
  displayImages: string[] = [];
  maxQuantity: number = 1;

  ngOnInit(): void {
    this.initializeComponent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fullProduct']) {
      this.initializeComponent();
    }
  }

  private initializeComponent(): void {
    if (!this.fullProduct) return;

    this.availableColors = this.getUniqueColors();

    if (this.availableColors.length > 0) {
      this.selectedColor = this.availableColors[0];
      this.updateAvailableSizes();
      this.selectDefaultSize();
    }
    else
    {
      this.selectedColor = null;
      this.selectedSize = null;
      this.selectedProductDetail = null;
      this.displayImages = this.fullProduct.imageUrl ? [this.fullProduct.imageUrl] : [];
      this.maxQuantity = this.fullProduct.unitsInStock;
    }
  }

  private getUniqueColors(): ColorOption[] {
    const colorMap = new Map<string, ColorOption>();

    this.fullProduct.details.forEach(detail => {
      if (!colorMap.has(detail.colorHex)) {
        colorMap.set(detail.colorHex, {
          name: detail.colorName,
          hexCode: detail.colorHex
        });
      }
    });

    return Array.from(colorMap.values());
  }

  private updateAvailableSizes(): void {
    if (!this.selectedColor) {
      this.availableSizes = [];
      return;
    }

    const matchingDetails = this.fullProduct.details.filter(
      detail => detail.colorHex === this.selectedColor!.hexCode
    );

    const sizeMap = new Map<string, SizeOption>();
    matchingDetails.forEach(detail => {
      if (!sizeMap.has(detail.sizeName)) {
        sizeMap.set(detail.sizeName, {
          name: detail.sizeName,
          description: detail.sizeName
        });
      }
    });

    this.availableSizes = Array.from(sizeMap.values());
  }

  private selectDefaultSize(): void {
    if (this.availableSizes.length > 0) {
      this.selectedSize = this.availableSizes[0];
      this.updateSelectedProductDetail();
    } else {
      this.selectedSize = null;
      this.selectedProductDetail = null;
    }
  }

  private updateSelectedProductDetail(): void {
    if (!this.selectedColor || !this.selectedSize) {
      this.selectedProductDetail = null;
      this.displayImages = this.fullProduct.imageUrl ? [this.fullProduct.imageUrl] : [];
      this.maxQuantity = this.fullProduct.unitsInStock;
      return;
    }

    this.selectedProductDetail = this.fullProduct.details.find(
      detail => detail.colorHex === this.selectedColor!.hexCode &&
                detail.sizeName === this.selectedSize!.name
    ) || null;

    if (this.selectedProductDetail && this.selectedProductDetail.imageUrls.length > 0) {
      this.displayImages = this.selectedProductDetail.imageUrls;
    } else {
      this.displayImages = this.fullProduct.imageUrl ? [this.fullProduct.imageUrl] : [];
    }

    this.maxQuantity = this.selectedProductDetail?.unitsInStock || this.fullProduct.unitsInStock;

    if (this.quantity > this.maxQuantity) {
      this.quantity = Math.min(this.quantity, this.maxQuantity);
    }
  }

  onColorSelected(color: ColorOption): void {
    this.selectedColor = color;
    this.updateAvailableSizes();
    this.selectDefaultSize();
  }

  onSizeSelected(size: SizeOption): void {
    this.selectedSize = size;
    this.updateSelectedProductDetail();
  }

  onQuantityChange(newQuantity: number): void {
    this.quantity = newQuantity;
  }

  onAddToCart(): void {
    const selection: ProductSelection = {
      productId: this.fullProduct.id,
      quantity: this.quantity,
      selectedProductDetail: this.selectedProductDetail
    };

    this.addToCartClicked.emit(selection);
  }

  get currentPrice(): number {
    return this.fullProduct.discount
      ? this.fullProduct.price * (1 - this.fullProduct.discount)
      : this.fullProduct.price;
  }

  get oldPrice() {
    return this.fullProduct.discount && this.fullProduct.discount > 0
      ? this.fullProduct.price
      : undefined;
  }
}
