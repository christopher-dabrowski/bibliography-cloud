package com.biblograpycloud.publications.dto;

import com.biblograpycloud.publications.dao.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {

    private Customer customer;
}
