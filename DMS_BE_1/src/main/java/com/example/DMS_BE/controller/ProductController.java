package com.example.DMS_BE.controller;

import com.example.DMS_BE.configuration.JwtRequestFilter;
import com.example.DMS_BE.entity.ImageModel;
import com.example.DMS_BE.entity.Product;
import com.example.DMS_BE.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    @PreAuthorize("hasRole('Admin') or hasRole('Distributor')")
    @PostMapping(value = {"/addNewProduct"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Product addNewProduct(@RequestPart("product") Product product,@RequestPart("imageFile") MultipartFile[] file) {
        try {
            Set<ImageModel> images = uploadImage(file);
            product.setProductImages(images);

            // Check if product exists and update it or create a new one
            Product existingProduct = productService.findProductByDistributorAndName(product.getUpdatedBy(), product.getProductName());
            if (existingProduct != null) {
                product.setProductId(existingProduct.getProductId());
                return productService.updateProduct(product);
            } else {
                return productService.addNewProduct(product);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }


    public Set<ImageModel> uploadImage(MultipartFile[] multipartFiles) throws IOException {
        Set<ImageModel> imageModels = new HashSet<>();

        for (MultipartFile file: multipartFiles) {
            ImageModel imageModel = new ImageModel(
                    file.getOriginalFilename(),
                    file.getContentType(),
                    file.getBytes()
            );
            imageModels.add(imageModel);
        }

        return imageModels;
    }

    //@PreAuthorize("hasRole('Admin') or hasRole('Distributor')")
    @GetMapping({"/getAllProducts"})
    public List<Product> getAllProducts()
    {
        return productService.getAllProducts();
    }

    @GetMapping({"/getProductDetailsById/{productId}"})
    public Product getProductDetailsById(@PathVariable("productId") Integer productId) {
        return productService.getProductDetailsById(productId);
    }

    @PreAuthorize("hasRole('Admin') or hasRole('Distributor')")
    @DeleteMapping({"/deleteProductDetails/{productId}"})
    public void deleteProductDetails(@PathVariable("productId") Integer productId) {
        productService.deleteProductDetails(productId);
    }

    @PreAuthorize("hasRole('User')")
    @GetMapping({"/getProductDetails/{isSingleProductCheckout}/{productId}"})
    public List<Product> getProductDetails(@PathVariable(name = "isSingleProductCheckout" ) boolean isSingleProductCheckout,
                                           @PathVariable(name = "productId")  Integer productId) {
        return productService.getProductDetails(isSingleProductCheckout, productId);
    }

//    updated
    @PreAuthorize("hasRole('Distributor')")
    @GetMapping({"/getDistributorProducts"})
    public List<Product> getProductsByDistributor() {
        String currentDistributor = JwtRequestFilter.CURRENT_USER;
        return productService.getProductsByUpdatedBy(currentDistributor);
    }


}
