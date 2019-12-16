package com.biblograpycloud.publications.dao.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * Class representing user file stored by file-storage app.
 * UserFile is uniquely identified by user name and file name
 */
@Entity
@Data
@NoArgsConstructor
public class UserFile {

    public UserFile(String userName, String fileName) {
        this.userName = userName;
        this.fileName = fileName;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userName;

    private String fileName;

//    @ManyToOne()
//    private Publication publication;
}
