package com.biblograpycloud.publications.dto;

import com.biblograpycloud.publications.dao.entity.PublicationShare;
import com.biblograpycloud.publications.dao.entity.UserFile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreatePublicationDTO {
    @NotNull
    @Size(min = 1)
    private String owner;

    @NotNull
    @Size(min = 1)
    private String title;

    @NotNull
    @Min(0)
    private Integer pageCount;

    @NotNull
    @Min(-2000)
    @Max(2500)
    private Integer publicationYear;

    private List<UserFile> attachments;

    private List<PublicationShare> shareList;
}