package com.biblograpycloud.publications.dao;

import com.biblograpycloud.publications.dao.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
