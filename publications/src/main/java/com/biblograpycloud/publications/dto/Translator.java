package com.biblograpycloud.publications.dto;

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
                .map(f -> createUserFileDTOWithHATEOAS(f)).collect(Collectors.toList());

        var publicationDTO = new PublicationDTO(publication.getId(), publication.getOwner(), publication.getTitle(), publication.getPageCount(),
                publication.getPublicationYear(), filesDTO, publication.getShareList());

        var controller = PublicationController.class;
        var selfLink = linkTo(methodOn(controller).getOnePublication(user, publication.getId())).withSelfRel();
        var deleteLink = linkTo(methodOn(controller).deletePublication(user, publication.getId())).withRel("delete");

        publicationDTO.add(selfLink, deleteLink);
        return publicationDTO;
    }

    public UserFileDTO createUserFileDTOWithHATEOAS(@NonNull UserFile userFile) {
        var user = userFile.getUserName();
        var file = userFile.getFileName();
        var userFileDTO = new UserFileDTO(userFile.getId(), userFile.getUserName(), userFile.getFileName());

        var controller = PublicationController.class;
        var downloadLink = new Link(fileStoreServer + "/files/" + userFile.getFileName() +
                "?user=" + user + "&token=" + jwtCreator.creteFileDownloadToken(user, file),
                "download");

        userFileDTO.add(downloadLink);

        return userFileDTO;
    }


    public Publication CreatePublicationDTOTOPublication(@NotNull CreatePublicationDTO createPublicationDTO) {
        return new Publication(createPublicationDTO.getOwner(), createPublicationDTO.getTitle(),
                createPublicationDTO.getPageCount(), createPublicationDTO.getPublicationYear(),
                createPublicationDTO.getAttachments(), createPublicationDTO.getShareList());
    }
}
