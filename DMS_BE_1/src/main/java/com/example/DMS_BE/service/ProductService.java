package com.example.DMS_BE.service;


import com.example.DMS_BE.configuration.JwtRequestFilter;
import com.example.DMS_BE.dao.*;
import com.example.DMS_BE.entity.Cart;
import com.example.DMS_BE.entity.Product;
import com.example.DMS_BE.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductDao productDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private CartDao cartDao;

    public Product addNewProduct(Product product) {
        return productDao.save(product);
    }

    public Product updateProduct(Product product) {
        return productDao.save(product);
    }

    public Product findProductByDistributorAndName(String distributor, String productName) {
        return productDao.findByUpdatedByAndProductName(distributor, productName);
    }
    public List<Product> getAllProducts()
    {
        return (List<Product>) productDao.findAll();
    }

    public Product getProductDetailsById(Integer productId) {
        return productDao.findById(productId).get();
    }

    public void deleteProductDetails(Integer productId) {
        productDao.deleteById(productId);
    }


    public List<Product> getProductDetails(boolean isSingleProductCheckout, Integer productId) {
        if(isSingleProductCheckout && productId != 0) {
            // we are going to buy a single product

            List<Product> list = new ArrayList<>();
            Product product = productDao.findById(productId).get();
            list.add(product);
            return list;
        } else {
            // we are going to checkout entire cart

            String username = JwtRequestFilter.CURRENT_USER;
            User user = userDao.findById(username).get();
            List<Cart> carts = cartDao.findByUser(user);
            return carts.stream().map(x -> x.getProduct()).collect(Collectors.toList());
        }
    }

    //updated here
    public List<Product> getProductsByUpdatedBy(String distributorUsername) {
        return productDao.findByUpdatedBy(distributorUsername);
    }


}
