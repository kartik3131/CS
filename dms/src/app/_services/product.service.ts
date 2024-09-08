import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { OrderDetails } from '../_model/order-details.model';
import { MyOrderDetails } from '../_model/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) { }

  public deleteCartItem(cartId: any)
  {
    return this.httpClient.delete("http://localhost:9090/deleteCartItem/"+cartId);
  }

  public addProduct(product: FormData){
    return this.httpClient.post<Product>("http://localhost:9090/addNewProduct",product);
  }

  public getAllProducts(){
    return this.httpClient.get<Product[]>("http://localhost:9090/getAllProducts");
  }

  public deleteProduct(productId:Number)
  {
    return this.httpClient.delete("http://localhost:9090/deleteProductDetails/"+productId);
  }

  public getProductDetailsById(productId: any)
  {
    return this.httpClient.get<Product>("http://localhost:9090/getProductDetailsById/"+productId);
  }

  public getProductDetails(isSingleProductCheckout: any,productId: any)
  {
    return this.httpClient.get<Product[]>("http://localhost:9090/getProductDetails/"+isSingleProductCheckout+"/"+productId);
  }

  public placeOrder(orderDetails: OrderDetails, isCartCheckout: any)
  {
    return this.httpClient.post("http://localhost:9090/placeOrder/"+isCartCheckout,orderDetails);
  }

  public addToCart(productId: any)
  {
    return this.httpClient.get("http://localhost:9090/addToCart/"+productId);
  }

  public getCartDetails()
  {
    return this.httpClient.get("http://localhost:9090/getCartDetails");
  }

  public getMyOrders():Observable<MyOrderDetails[]>
  {
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:9090/getOrderDetails");
  }


  public getAllOrdersDetails():Observable<MyOrderDetails[]>
  {
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:9090/getAllOrderDetails");
  }

  public markAsDelivered(orderId: number)
  {
    return this.httpClient.get("http://localhost:9090/markOrderAsDelivered/"+orderId)
  }
}