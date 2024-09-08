import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { MyOrderDetails } from '../_model/order.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit{

  ngOnInit(): void {
      this.getOrderDetails();
  }

  displayedColumns: string[] = ['Name', 'Address', 'From','Contact No.','Quantity' ,'Order Amount','Status'];

  myOrderDetails: MyOrderDetails[] =[];

  constructor(private productService:ProductService){}

  getOrderDetails()
  {
    this.productService.getMyOrders().subscribe(
      (response:MyOrderDetails[])=>
      {
        console.log(response);
        this.myOrderDetails = response
      },
      (error)=>
      {
        console.log(error)
      }
    );
  }

}
