package com.example.DMS_BE.dao;

import com.example.DMS_BE.entity.OrderDetail;
import com.example.DMS_BE.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailDao extends CrudRepository<OrderDetail,Integer> {
    public List<OrderDetail> findByUser(User user);
}
