import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingIndicatorComponent } from '../../shared/components/loading-indicator/loading-indicator.component';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { ProductInfoComponent, ProductSelection } from './components/product-info/product-info.component';
import { ProductListComponent } from '../../shared/components/product-list/product-list.component';
import { FullProduct } from '../../shared/models/product/fullProduct';
import { Product } from '../../shared/models/product/product';
import { Review } from '../../shared/models/review/review';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [LoadingIndicatorComponent, ReviewListComponent, ProductInfoComponent, ProductListComponent, AsyncPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  productId: number = 0;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  demoFullProduct: FullProduct = {
    id: 1,
    name: 'One Life Graphic T-shirt',
    description: 'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    price: 260,
    imageUrl: 'https://via.placeholder.com/400x400/FF0000/FFFFFF?text=Main+Image',
    discount: 0.4,
    rating: 4.5,
    unitsInStock: 100,
    details: [
      // Red color variations
      {
        id: 1, colorName: 'Red', colorHex: '#FF0000', sizeName: 'Small', unitsInStock: 15, sku: 'OLGTS-RED-S',
        imageUrls: ['https://via.placeholder.com/400x400/FF0000/FFFFFF?text=Red+Main', 'https://via.placeholder.com/400x400/FF4444/FFFFFF?text=Red+Detail+1', 'https://via.placeholder.com/400x400/FF8888/FFFFFF?text=Red+Detail+2']
      },
      {
        id: 2, colorName: 'Red', colorHex: '#FF0000', sizeName: 'Medium', unitsInStock: 25, sku: 'OLGTS-RED-M',
        imageUrls: ['https://via.placeholder.com/400x400/FF0000/FFFFFF?text=Red+Main', 'https://via.placeholder.com/400x400/FF4444/FFFFFF?text=Red+Detail+1', 'https://via.placeholder.com/400x400/FF8888/FFFFFF?text=Red+Detail+2', 'https://via.placeholder.com/400x400/FFAAAA/FFFFFF?text=Red+Detail+3']
      },
      {
        id: 3, colorName: 'Red', colorHex: '#FF0000', sizeName: 'Large', unitsInStock: 20, sku: 'OLGTS-RED-L',
        imageUrls: ['https://via.placeholder.com/400x400/FF0000/FFFFFF?text=Red+Main', 'https://via.placeholder.com/400x400/FF4444/FFFFFF?text=Red+Detail+1']
      },
      // Blue color variations
      {
        id: 4, colorName: 'Blue', colorHex: '#0000FF', sizeName: 'Small', unitsInStock: 12, sku: 'OLGTS-BLUE-S',
        imageUrls: ['https://via.placeholder.com/400x400/0000FF/FFFFFF?text=Blue+Main', 'https://via.placeholder.com/400x400/4444FF/FFFFFF?text=Blue+Detail+1', 'https://via.placeholder.com/400x400/8888FF/FFFFFF?text=Blue+Detail+2', 'https://via.placeholder.com/400x400/AAAAFF/FFFFFF?text=Blue+Detail+3', 'https://via.placeholder.com/400x400/CCCCFF/FFFFFF?text=Blue+Detail+4']
      },
      {
        id: 5, colorName: 'Blue', colorHex: '#0000FF', sizeName: 'Medium', unitsInStock: 18, sku: 'OLGTS-BLUE-M',
        imageUrls: ['https://via.placeholder.com/400x400/0000FF/FFFFFF?text=Blue+Main', 'https://via.placeholder.com/400x400/4444FF/FFFFFF?text=Blue+Detail+1']
      },
      {
        id: 6, colorName: 'Blue', colorHex: '#0000FF', sizeName: 'Large', unitsInStock: 10, sku: 'OLGTS-BLUE-L',
        imageUrls: []  // No specific images - will fallback to main
      },
      // Green color variations
      {
        id: 7, colorName: 'Green', colorHex: '#00FF00', sizeName: 'Medium', unitsInStock: 8, sku: 'OLGTS-GREEN-M',
        imageUrls: ['https://via.placeholder.com/400x400/00FF00/FFFFFF?text=Green+Main']
      },
      {
        id: 8, colorName: 'Green', colorHex: '#00FF00', sizeName: 'Large', unitsInStock: 5, sku: 'OLGTS-GREEN-L',
        imageUrls: ['https://via.placeholder.com/400x400/00FF00/FFFFFF?text=Green+Main', 'https://via.placeholder.com/400x400/44FF44/FFFFFF?text=Green+Detail+1', 'https://via.placeholder.com/400x400/88FF88/FFFFFF?text=Green+Detail+2']
      }
    ]
  };

  // Demo reviews data
  demoReviews: Review[] = [
    {
      id: 1,
      productId: 1,
      userName: 'Sarah M.',
      comment: 'I\'m blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I\'ve bought has exceeded my expectations.',
      rating: 5,
      createdAt: new Date('2024-01-15')
    },
    {
      id: 2,
      productId: 1,
      userName: 'Alex K.',
      comment: 'Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable.',
      rating: 5,
      createdAt: new Date('2024-01-10')
    },
    {
      id: 3,
      productId: 1,
      userName: 'James L.',
      comment: 'As someone who\'s always on the lookout for unique fashion pieces, I\'m thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.',
      rating: 4,
      createdAt: new Date('2024-01-08')
    },
    {
      id: 4,
      productId: 1,
      userName: 'Emily R.',
      comment: 'Great quality and fast shipping! The fabric feels premium and the fit is perfect. Will definitely order again.',
      rating: 5,
      createdAt: new Date('2024-01-05')
    }
  ];

  // Demo "Also Like" products
  alsoLikeProducts: Product[] = [
    {
      id: 2,
      name: 'Polo with Contrast Trims',
      description: 'Classic polo shirt with modern contrast details',
      price: 212,
      imageUrl: 'https://via.placeholder.com/300x300/4F46E5/FFFFFF?text=Polo+Shirt',
      discount: 0.2,
      rating: 4.0,
      unitsInStock: 50
    },
    {
      id: 3,
      name: 'Gradient Graphic T-shirt',
      description: 'Modern gradient design perfect for casual wear',
      price: 145,
      imageUrl: 'https://via.placeholder.com/300x300/EF4444/FFFFFF?text=Gradient+Tee',
      rating: 3.5,
      unitsInStock: 30
    },
    {
      id: 4,
      name: 'Polo with Tipping Details',
      description: 'Premium polo with distinctive tipping accents',
      price: 180,
      imageUrl: 'https://via.placeholder.com/300x300/10B981/FFFFFF?text=Tipping+Polo',
      rating: 4.5,
      unitsInStock: 25
    },
    {
      id: 5,
      name: 'Black Striped T-shirt',
      description: 'Classic black and white striped design',
      price: 120,
      imageUrl: 'https://via.placeholder.com/300x300/1F2937/FFFFFF?text=Striped+Tee',
      discount: 0.3,
      rating: 4.5,
      unitsInStock: 40
    }
  ];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'] || 1;
      this.loadProductData();
    });
  }

  loadProductData(): void {
    this.isLoading = true;
    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  onProductAddToCart(selection: ProductSelection): void {
  }

  onWriteReview(): void {
    console.log('Write review clicked');
    // Here you would navigate to write review page or open modal
    alert('Write review functionality would be implemented here');
  }

  onAlsoLikeProductClick(product: Product): void {
    console.log('Also like product clicked:', product);
    // Navigate to the clicked product's detail page
    this.router.navigate(['/products', product.id]);
  }
}
