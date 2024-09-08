package com.example.DMS_BE.service;

import com.example.DMS_BE.configuration.JwtRequestFilter;
import com.example.DMS_BE.dao.CartDao;
import com.example.DMS_BE.dao.OrderDetailDao;
import com.example.DMS_BE.dao.ProductDao;
import com.example.DMS_BE.dao.UserDao;
import com.example.DMS_BE.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderDetailService {

    @Autowired
    private OrderDetailDao orderDetailDao;
    private static String ORDER_PLACED="Placed";
    @Autowired
    private UserDao userDao;

    @Autowired
    private CartDao cartDao;

    @Autowired
    private ProductDao productDao;
    public void placeOrder(OrderInput orderInput, boolean isSingleProductCheckout)
    {

       List<OrderProductQuantity> productQuantityList = orderInput.getOrderProductQuantityList();

       for(OrderProductQuantity o: productQuantityList)
       {
           Product product = productDao.findById(o.getProductId()).get();
           String currentUser = JwtRequestFilter.CURRENT_USER;
           User user = userDao.findById(currentUser).get();
           OrderDetail orderDetail = new OrderDetail(
                   orderInput.getFullName(),
                   orderInput.getFullAddress(),
                   orderInput.getContactNumber(),
                   orderInput.getAlternateContactNumber(),
                   ORDER_PLACED,
                   product.getProductActualPrice()*o.getQuantity(),
                   product,
                   user
           );

           if(!isSingleProductCheckout) {
               List<Cart> carts = cartDao.findByUser(user);
               carts.stream().forEach(x->cartDao.deleteById(x.getCartId()));
           }

           orderDetailDao.save(orderDetail);
       }
    }

    public List<OrderDetail> getOrderDetails() {
        String currentUser = JwtRequestFilter.CURRENT_USER;
        User user = userDao.findById(currentUser).get();

        return orderDetailDao.findByUser(user);
    }

    public List<OrderDetail> getAllOrderDetails()  //String status) {
    {    List<OrderDetail> orderDetails = new ArrayList<>();

        orderDetailDao.findAll().forEach(orderDetails::add);

        return orderDetails;
    }

    public void markOrderAsDelivered(Integer orderId) {
        OrderDetail orderDetail = orderDetailDao.findById(orderId).get();

        if(orderDetail != null) {
            orderDetail.setOrderStatus("Delivered");
            orderDetailDao.save(orderDetail);
        }

    }
}
