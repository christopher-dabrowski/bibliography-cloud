package com.biblograpycloud.publications.dao;

import com.biblograpycloud.publications.dao.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
}
