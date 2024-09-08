package com.example.DMS_BE.controller;

import com.example.DMS_BE.entity.OrderDetail;
import com.example.DMS_BE.entity.OrderInput;
import com.example.DMS_BE.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderDetailsController {

    @Autowired
    private OrderDetailService orderDetailService;

    @PreAuthorize("hasRole('User')")
    @PostMapping({"/placeOrder/{isSingleProductCheckout}"})
    public void placeOrder(@PathVariable(name = "isSingleProductCheckout") boolean isSingleProductCheckout, @RequestBody OrderInput orderInput)
    {
        orderDetailService.placeOrder(orderInput,isSingleProductCheckout);
    }

    @PreAuthorize("hasRole('User')")
    @GetMapping({"/getOrderDetails"})
    public List<OrderDetail> getOrderDetails() {
        return orderDetailService.getOrderDetails();
    }

    @PreAuthorize("hasRole('Admin') or hasRole('Distributor')")
    @GetMapping({"/getAllOrderDetails"})          // /{status}"})
    public List<OrderDetail> getAllOrderDetails()
    { //@PathVariable(name = "status") String status) {
        return orderDetailService.getAllOrderDetails();  //  status);
    }

    @PreAuthorize("hasRole('Admin') or hasRole('Distributor')")
    @GetMapping({"/markOrderAsDelivered/{orderId}"})
    public void markOrderAsDelivered(@PathVariable(name = "orderId") Integer orderId) {
        orderDetailService.markOrderAsDelivered(orderId);
    }

    @PreAuthorize("hasRole('Distributor')")
    @GetMapping({"/getDistributorOrderDetails"})
    public List<OrderDetail> getDistributorOrderDetails() {
        return orderDetailService.getAllOrderDetailsForDistributor();
    }

}
