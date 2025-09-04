import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { ImageGalleryComponent } from '../image-gallery/image-gallery.component';
import { ProductRatingComponent } from '../../../../shared/components/product-rating/product-rating.component';
import { ProductPriceComponent } from '../../../../shared/components/product-price/product-price.component';
import { ColorSelectorComponent, ColorOption } from '../../../../shared/components/color-selector/color-selector.component';
import { SizeSelectorComponent, SizeOption } from '../../../../shared/components/size-selector/size-selector.component';
import { CounterComponent } from '../../../../shared/components/counter/counter.component';
import { FullProduct } from '../../../../shared/models/product/fullProduct';
import { ProductDetail } from '../../../../shared/models/product/productDetail';
import { AppState } from '../../../../store/app.state';
import { selectProductQuantityInCart } from '../../../../store/cart/cart.selectors';
import { CartItem } from '../../../../shared/models/cart/cartItem';
import * as CartActions from '../../../../store/cart/cart.actions';


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
export class ProductInfoComponent implements OnInit, OnChanges, OnDestroy {
  @Input() fullProduct!: FullProduct;

  selectedColor: ColorOption | null = null;
  selectedSize: SizeOption | null = null;
  selectedProductDetail: ProductDetail | null = null;
  quantity: number = 1;

  availableColors: ColorOption[] = [];
  availableSizes: SizeOption[] = [];
  displayImages: string[] = [];
  maxQuantity: number = 1;

  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(CartActions.loadCart());

    this.initializeComponent();

    this.store.select(state => state.cart.items)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateMaxQuantity();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fullProduct']) {
      this.initializeComponent();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
      this.updateMaxQuantity();
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
                detail.sizeName === this.selectedSize!.name) || null;

    if (this.selectedProductDetail && this.selectedProductDetail.imageUrls.length > 0) {
      this.displayImages = this.selectedProductDetail.imageUrls;
    } else {
      this.displayImages = this.fullProduct.imageUrl ? [this.fullProduct.imageUrl] : [];
    }

    this.updateMaxQuantity();
  }

  private updateMaxQuantity(): void {
    if (this.selectedProductDetail) {
      const availableStock = this.selectedProductDetail.unitsInStock;

      this.store.select(selectProductQuantityInCart(this.selectedProductDetail.id))
        .pipe(takeUntil(this.destroy$))
        .subscribe(quantityInCart => {
          this.maxQuantity = Math.max(0, availableStock - quantityInCart);

          if (this.quantity > this.maxQuantity) {
            this.quantity = Math.max(1, this.maxQuantity);
          }
        });
    } else {
      this.maxQuantity = this.fullProduct.unitsInStock;
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
    if (this.selectedProductDetail && this.maxQuantity > 0) {
      const cartItem: CartItem = {
        productId: this.fullProduct.id,
        quantity: this.quantity,
        productDetail: this.selectedProductDetail
      };

      this.store.dispatch(CartActions.addToCart({ item: cartItem }));
      this.quantity = 1;
    }
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
