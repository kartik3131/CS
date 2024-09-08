package com.example.DMS_BE.dao;


import com.example.DMS_BE.entity.Cart;
import com.example.DMS_BE.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartDao extends CrudRepository<Cart, Integer > {
    public List<Cart> findByUser(User user);
}
