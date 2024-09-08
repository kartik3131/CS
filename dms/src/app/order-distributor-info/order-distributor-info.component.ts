import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { MyOrderDetails } from '../_model/order.model';

@Component({
  selector: 'app-order-distributor-info',
  templateUrl: './order-distributor-info.component.html',
  styleUrl: './order-distributor-info.component.css'
})
export class OrderDistributorInfoComponent implements OnInit {

  constructor(private productService:ProductService){}

  ngOnInit(): void {
    this.getDistributorOrderDetails();
  }
  dataSource: MyOrderDetails[] = [];

  displayedColumns: string[] = ['Id', 'Product Name','Retailer','Name','Distributor','Address','Contact No.','Status','Action'];

  public getDistributorOrderDetails()
  {
    this.productService.getDistributorOrderDetails().subscribe(
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
        this.getDistributorOrderDetails();
      },
      (error)=>
      {
        console.log(error);
      }
    )
  }

}
