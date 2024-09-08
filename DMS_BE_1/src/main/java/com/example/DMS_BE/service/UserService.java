package com.example.DMS_BE.service;


import com.example.DMS_BE.dao.RoleDao;
import com.example.DMS_BE.dao.UserDao;
import com.example.DMS_BE.entity.Role;
import com.example.DMS_BE.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void initRoleAndUser() {

        Role adminRole = new Role();
        adminRole.setRoleName("Admin");
        adminRole.setRoleDescription("Admin role");
        roleDao.save(adminRole);

        Role userRole = new Role();
        userRole.setRoleName("User");
        userRole.setRoleDescription("Default role");
        roleDao.save(userRole);

        Role DistiRole = new Role();
        DistiRole.setRoleName("Distributor");
        DistiRole.setRoleDescription("Default role");
        roleDao.save(DistiRole);

        User adminUser = new User();
        adminUser.setUserName("Admin@123");
        adminUser.setUserPassword(getEncodedPassword("Admin@123"));
        adminUser.setUserFirstName("Admin");
        adminUser.setUserLastName("123");
        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(adminRole);
        adminUser.setRole(adminRoles);
        userDao.save(adminUser);

        User user = new User();
        user.setUserName("Retailer@123");
        user.setUserPassword(getEncodedPassword("Retailer@123"));
        user.setUserFirstName("Retailer");
        user.setUserLastName("123");
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(userRole);
        user.setRole(userRoles);
        userDao.save(user);

        User Distributor = new User();
        Distributor.setUserName("Distributor@123");
        Distributor.setUserPassword(getEncodedPassword("Distributor@123"));
        Distributor.setUserFirstName("Distributor");
        Distributor.setUserLastName("123");
        Set<Role> DistiRoles = new HashSet<>();
        DistiRoles.add(DistiRole);
        Distributor.setRole(DistiRoles);
        userDao.save(Distributor);
    }

    public User registerNewUser(User user, String roleName) {
        Role role = roleDao.findById(roleName).get();
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(role);
        user.setRole(userRoles);
        user.setUserPassword(getEncodedPassword(user.getUserPassword()));
        return userDao.save(user);
    }

    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }
}
