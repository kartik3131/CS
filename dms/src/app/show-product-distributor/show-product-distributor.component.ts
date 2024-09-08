import { Component } from '@angular/core';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageProcessingServiceService } from '../image-processing-service.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';

@Component({
  selector: 'app-show-product-distributor',
  templateUrl: './show-product-distributor.component.html',
  styleUrl: './show-product-distributor.component.css'
})
export class ShowProductDistributorComponent {

  ngOnInit(): void {
    this.getAllProducts();
  }

  productDetails: Product[] = [];
  displayedColumns: string[] = ['Product Id','Product Name','Description','Discounted Price','Quantity','Actual Price','Actions'];

  constructor(private productService:ProductService, 
    public imagesDialog:MatDialog,
    private imageProcessingService:ImageProcessingServiceService,
    private router : Router
  ){ }

  public getAllProducts()
  {
     this.productService.getAllProductsByDistributor()
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

  deleteProduct(productID: Number) {
     this.productService.deleteProduct(productID).subscribe(
      (resp: any)=>
        {
          console.log(resp);
          this.getAllProducts();
        },
        (error:HttpErrorResponse)=>
        {
          console.log(error);
        }
    );
  }

  showImages(product: Product)
  {
    console.log(product);
    this.imagesDialog.open(ShowProductImagesDialogComponent,{
      data:{
        images:product.productImages
      },
      height:'500px',width:'800px'
    });
  }

  editProductDetails(productId: any)
  { 
    this.router.navigate(['/addNewInventory',{productId:productId}]);
  }
}
