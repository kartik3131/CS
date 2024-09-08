import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../_model/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingServiceService } from '../image-processing-service.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrl: './show-product-details.component.css'
})
export class ShowProductDetailsComponent implements OnInit{

  ngOnInit(): void {
    this.getAllProducts();
  }

  productDetails: Product[] = [];
  displayedColumns: string[] = ['Product Id','Product Name','Description','Discounted Price','Actual Price','Actions'];

  constructor(private productService:ProductService, 
    public imagesDialog:MatDialog,
    private imageProcessingService:ImageProcessingServiceService,
    private router : Router
  ){ }

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
    this.router.navigate(['/addNewProduct',{productId:productId}]);
  }
}
