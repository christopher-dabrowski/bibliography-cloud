package com.biblograpycloud.publications.dao.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
public class Publication {

    public Publication(String title, Integer pageCount, Integer publicationYear) {
        this.title = title;
        this.pageCount = pageCount;
        this.publicationYear = publicationYear;
    }

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    private String title;

    private Integer pageCount;

    private Integer publicationYear;
}
