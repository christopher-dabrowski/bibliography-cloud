package com.biblograpycloud.publications.dao.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Class for storing data about publication sharing
 */
@Entity
@NoArgsConstructor
@Data
public class PublicationShare {

    public PublicationShare(String user, Boolean canRead, Boolean canDelete) {
        this.user = user;
        this.canRead = canRead;
        this.canDelete = canDelete;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String user;

    private Boolean canRead;
    private Boolean canDelete;
}
