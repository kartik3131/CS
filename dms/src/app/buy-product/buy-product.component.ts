import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrl: './buy-product.component.css'
})
export class BuyProductComponent implements OnInit{

  constructor(private activatedRoute:ActivatedRoute,
    private productService:ProductService,
    private router:Router
  ){}


  productDetails: Product[] =[];
  isSingleProductCheckout : string='';


  orderDetails:OrderDetails =
  {
    fullName: "",
    fullAddress: "",
    contactNumber: "",
    alternateContactNumber: "",
    orderProductQuantityList: []
  }

  ngOnInit(): void {
      this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
      this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout") ?? '';
      this.productDetails.forEach(
        x => this.orderDetails.orderProductQuantityList.push(
         {productId: x.productId,quantity:1} 
        )
      );

      console.log(this.orderDetails);
      console.log(this.productDetails);
  }

  public placeOrder(orderForm : NgForm)
  {
    this.productService.placeOrder(this.orderDetails,this.isSingleProductCheckout).subscribe(
      (response)=>
        {
          orderForm.reset();
          this.router.navigate(["/orderConfirm"]);
        },
        (error:HttpErrorResponse)=>
        {
          console.log(error);
          alert("Insufficient quantity ");
          orderForm.reset();
        }
      );
    }

    getQuantityForProduct(productId: any)
    {
      const fileteredProduct = this.orderDetails.orderProductQuantityList.filter(
        (prodductQuantity) => prodductQuantity.productId === productId
      );
       return fileteredProduct[0].quantity;
    }


    getCalculatedTotal(productId: number,productDiscountedPrice: number)
    {
      const fileteredProduct = this.orderDetails.orderProductQuantityList.filter(
        (productQuantity)=>productQuantity.productId === productId
      );
      return fileteredProduct[0].quantity * productDiscountedPrice;
    }

    onQuantityChanged(quantity: any,productId: number)
    {
      this.orderDetails.orderProductQuantityList.filter(
        (orderProduct) => orderProduct.productId === productId
      )[0].quantity = quantity;
    }

    getCalculatedGrandTotal(){
      let grandTotal=0;
      this.orderDetails.orderProductQuantityList.forEach(
        (productQuantity)=> {
          const price = this.productDetails.filter(product => product.productId === productQuantity.productId)[0].productDiscountedPrice;
          grandTotal = grandTotal + price*productQuantity.quantity;
        }
      );

      return grandTotal;
    }
}
