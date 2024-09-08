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
export class RetailerNavComponent implements OnInit{
  productDetails: Product[] = [];
  
  ngOnInit(): void {
    this.getAllProducts();
  }

  constructor(private productService:ProductService, 
    private imageProcessingService:ImageProcessingServiceService,
    private router:Router
  ){}

  public getAllProducts()
  {
     this.productService.getAllProducts()
     .pipe(
      map((x:Product[],i)=>x.map((product: Product) => this.imageProcessingService.createImages(product)))
     )
     .subscribe(
      (resp: Product[])=>
      {
        console.log(resp);
        this.productDetails=resp;
      },
      (error:HttpErrorResponse)=>
      {
        console.log(error);
      }
    );
  }

  showProductDetails(productId: any)
  {
    this.router.navigate(['/productViewDetails', {productId: productId}]);
  }

}
