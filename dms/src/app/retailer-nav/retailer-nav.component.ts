import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { map } from 'rxjs/operators';
import { Product } from '../_model/product.model';
import { ImageProcessingServiceService } from '../image-processing-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-retailer-nav',
  templateUrl: './retailer-nav.component.html',
  styleUrl: './retailer-nav.component.css'
})
export class RetailerNavComponent implements OnInit {
  productDetails: Product[] = [];
  
  constructor(private productService: ProductService, 
              private imageProcessingService: ImageProcessingServiceService,
              private router: Router) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService.getAllProducts()
      .pipe(
        // Process images and filter products with quantity >= 5
        map((products: Product[]) => 
          products
            .map((product: Product) => this.imageProcessingService.createImages(product))
            .filter((product: Product) => product.quantity >= 5) // Filter products
        )
      )
      .subscribe(
        (resp: Product[]) => {
          console.log(resp);
          this.productDetails = resp;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  showProductDetails(productId: any) {
    this.router.navigate(['/productViewDetails', { productId: productId }]);
  }
}
