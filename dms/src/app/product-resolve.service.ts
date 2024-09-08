import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from './_model/product.model';
import { map, Observable, of } from 'rxjs';
import { ProductService } from './_services/product.service';
import { ImageProcessingServiceService } from './image-processing-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product> {

  constructor(private productService:ProductService,
    private imageProcessingService:ImageProcessingServiceService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const id = route.paramMap.get("productId");
    if (id) {
      console.log("working");
      //then fetch details from backend else return null object
      return this.productService.getProductDetailsById(id)
      .pipe(
        map(p =>this.imageProcessingService.createImages(p))
      );
    }
    else {
      console.log("not working");
      return of(this.getProductDetails());
    }
  }

  getProductDetails() {
    return {
      productId:null,
      productName: "",
      productDescription: "",
      productActualPrice: 0,
      productDiscountedPrice: 0,
      productImages: [],
      quantity:0,
      updatedBy:""
    }
  }
}
