package com.biblograpycloud.publications.api;

import com.biblograpycloud.publications.dao.CustomerRepository;
import com.biblograpycloud.publications.dao.ProductRepository;
import com.biblograpycloud.publications.dao.entity.Customer;
import com.biblograpycloud.publications.dto.OrderRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class OrderController {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/placeOrder")
    public Customer placeOrder(@RequestBody OrderRequest request) {
        return customerRepository.save(request.getCustomer());
    }

    @GetMapping("/findAllOrders")
    public List<Customer> list() {
        return customerRepository.findAll();
    }
}
