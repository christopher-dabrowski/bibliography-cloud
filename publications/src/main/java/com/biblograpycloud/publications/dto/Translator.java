package com.biblograpycloud.publications.dto;

import com.biblograpycloud.publications.api.AttachmentController;
import com.biblograpycloud.publications.api.PublicationController;
import com.biblograpycloud.publications.dao.entity.Publication;
import com.biblograpycloud.publications.dao.entity.UserFile;
import com.biblograpycloud.publications.jwt.JwtCreator;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Service
public class Translator {

    private JwtCreator jwtCreator;

    @Value("${FILE_STORE_SERVER}")
    private String fileStoreServer;

    public Translator(@Autowired JwtCreator jwtCreator) {
        this.jwtCreator = jwtCreator;
    }

    public PublicationDTO createPublicationDTOWithHATEOAS(@NonNull Publication publication, @NonNull String user) {

        var filesDTO = publication.getAttachments().stream()
                .map(f -> createUserFileDTOWithHATEOAS(f, publication.getId())).collect(Collectors.toList());

        var publicationDTO = new PublicationDTO(publication.getId(), publication.getOwner(), publication.getTitle(), publication.getPageCount(),
                publication.getPublicationYear(), filesDTO, publication.getShareList());

        var controller = PublicationController.class;
        var selfLink = linkTo(methodOn(controller).getOnePublication(user, publication.getId())).withSelfRel();
        var deleteLink = linkTo(methodOn(controller).deletePublication(user, publication.getId())).withRel("delete");

        var attachFileLink = linkTo(methodOn(AttachmentController.class).attachFile(user, publication.getId(), null))
                .withRel("attachFile");

        publicationDTO.add(selfLink, deleteLink, attachFileLink);
        return publicationDTO;
    }

    public UserFileDTO createUserFileDTOWithHATEOAS(@NonNull UserFile userFile, @NonNull Long publicationId) {
        var user = userFile.getUserName();
        var file = userFile.getFileName();
        var userFileDTO = new UserFileDTO(userFile.getId(), userFile.getUserName(), userFile.getFileName());

        var controller = AttachmentController.class;
        var downloadLink = new Link("{appBaseUrl}/api/downloadFile?fileName={fileName}").withRel("download");
        var detachLink = linkTo(methodOn(controller).detach(user, publicationId, userFile.getId())).withRel("detach");

        userFileDTO.add(downloadLink, detachLink);

        return userFileDTO;
    }


    public Publication CreatePublicationDTOTOPublication(@NotNull CreatePublicationDTO createPublicationDTO) {
        return new Publication(createPublicationDTO.getOwner(), createPublicationDTO.getTitle(),
                createPublicationDTO.getPageCount(), createPublicationDTO.getPublicationYear(),
                createPublicationDTO.getAttachments(), createPublicationDTO.getShareList());
    }
}
