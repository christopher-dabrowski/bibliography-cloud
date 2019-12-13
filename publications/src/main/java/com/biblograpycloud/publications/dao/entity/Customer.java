package com.biblograpycloud.publications.dao.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Customer {

    @Id
    @GeneratedValue
    private int id;
    private String name;
//    private String email;

    @OneToMany(targetEntity = Product.class, cascade = CascadeType.ALL)
//    @JoinColumn(name = "cp_fk", referencedColumnName = "id")
    private List<Product> products;
}
