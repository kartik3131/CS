import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { MyOrderDetails } from '../_model/order.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit{

  constructor(private productService:ProductService){}

  ngOnInit(): void {
    this.getAllOrderDetails();
  }
  dataSource: MyOrderDetails[] = [];

  displayedColumns: string[] = ['Id', 'Product Name', 'Name', 'Address','Contact No.','Status','Action'];

  public getAllOrderDetails()
  {
    this.productService.getAllOrdersDetails().subscribe(
      (respons)=>
      {
        this.dataSource=respons;
        console.log(respons);
      },
      (error)=>
      {
        console.log(error);
      }
    );
  }

  markAsDelivered(element: any){
    this.productService.markAsDelivered(element).subscribe(
      (response)=>
      {
        console.log(response);
        this.getAllOrderDetails();
      },
      (error)=>
      {
        console.log(error);
      }
    )
  }
}
