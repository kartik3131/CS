import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrl: './product-view-details.component.css'
})
export class ProductViewDetailsComponent implements OnInit{
  
  product: Product | undefined;

  constructor(private activatedRoute:ActivatedRoute,
    private router:Router,
    private productService:ProductService
  ){}
 
  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product)
  }

  buyProduct(producId: any)
  {
    this.router.navigate(['/buyProduct',{
      isSingleProductCheckout:true,
      id:producId
    }]);
  }

  addToCart(productId: number)
  {
    this.productService.addToCart(productId).subscribe(
      (response)=>{
        console.log(response)
      },
      (error)=>
      {
        console.log(error);
      }
    )
  }

}
