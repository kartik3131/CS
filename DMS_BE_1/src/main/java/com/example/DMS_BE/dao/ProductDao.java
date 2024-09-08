package com.example.DMS_BE.dao;


import com.example.DMS_BE.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDao extends CrudRepository<Product, Integer> {
//    public List<Product> findAll(Pageable pageable);
//
//    public List<Product> findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCase(
//            String key1, String key2, Pageable pageable
//    );

//    public String findByDistributor(String name);
}
