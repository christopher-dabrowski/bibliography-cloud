package com.biblograpycloud.publications.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.hateoas.EntityModel;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserFileDTO extends EntityModel<UserFileDTO> {

    private Long id;

    private String userName;

    private String fileName;
}
