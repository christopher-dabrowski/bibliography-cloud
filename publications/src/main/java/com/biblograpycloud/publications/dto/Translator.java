package com.biblograpycloud.publications.dto;

import com.biblograpycloud.publications.dao.entity.Publication;
import lombok.NonNull;

public class Translator {

    public static PublicationDTO createPublicationDTOWithHATEOAS(@NonNull Publication publication) {

        var publicationDTO = new PublicationDTO(publication.getId(), publication.getOwner(), publication.getTitle(),
                publication.getPageCount(), publication.getPublicationYear(), publication.getAttachments(),
                publication.getShareList());

        return publicationDTO;
    }
}
