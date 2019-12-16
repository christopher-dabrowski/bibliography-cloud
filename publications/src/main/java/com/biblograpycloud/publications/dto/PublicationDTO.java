package com.biblograpycloud.publications.dto;

import com.biblograpycloud.publications.dao.entity.PublicationShare;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.hateoas.EntityModel;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PublicationDTO extends EntityModel<PublicationDTO> {
    private String owner;

    private String title;
    private Integer pageCount;
    private Integer publicationYear;

    private List<UserFileDTO> attachments;

    private List<PublicationShare> shareList;

    public static class CrerateAttachment {
    }
}
