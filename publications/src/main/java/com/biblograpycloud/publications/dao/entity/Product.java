package com.biblograpycloud.publications.dao.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Product {

    @Id
    private int pid;
    private String productName;
//    private int qty;
    private int price;

    @ManyToOne
    @JoinColumn(name = "cp_fk")
    private Customer customer;
}
