import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from './_model/product.model';
import { map, Observable } from 'rxjs';
import { ProductService } from './_services/product.service';
import { ImageProcessingServiceService } from './image-processing-service.service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]> {

  constructor(private productService: ProductService,
    private imageProcessingService :ImageProcessingServiceService
  ) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {
    const id= route.paramMap.get("id");
    const isSingleProductCheckout = route.paramMap.get("isSingleProductCheckout");
    return this.productService.getProductDetails(isSingleProductCheckout,id)
    .pipe(
      map(
        (x:Product[],i: any)=>x.map((product:Product) => this.imageProcessingService.createImages(product))
      )
    );
  }
}
