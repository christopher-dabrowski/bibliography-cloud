package com.biblograpycloud.publications.dto;

import com.biblograpycloud.publications.api.PublicationApi;
import com.biblograpycloud.publications.dao.entity.Publication;
import lombok.NonNull;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

public class Translator {

    public static PublicationDTO createPublicationDTOWithHATEOAS(@NonNull Publication publication, @NonNull String user) {

        var publicationDTO = new PublicationDTO(publication.getId(), publication.getOwner(), publication.getTitle(),
                publication.getPageCount(), publication.getPublicationYear(), publication.getAttachments(),
                publication.getShareList());

        var controller = PublicationApi.class;
        var selfLink = linkTo(methodOn(controller).getOnePublication(user, publication.getId())).withSelfRel();
        var deleteLink = linkTo(methodOn(controller).deletePublication(user, publication.getId())).withRel("delete");

        publicationDTO.add(selfLink, deleteLink);
        return publicationDTO;
    }
}
