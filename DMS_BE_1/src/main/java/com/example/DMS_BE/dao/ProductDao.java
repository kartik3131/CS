package com.example.DMS_BE.dao;


import com.example.DMS_BE.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDao extends CrudRepository<Product, Integer> {
    Product findByUpdatedByAndProductName(String updatedBy, String productName);

    //updated
    List<Product> findByUpdatedBy(String updatedBy);

}
