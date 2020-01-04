package com.biblograpycloud.publications.api;

import com.biblograpycloud.publications.dao.entity.UserFile;
import com.biblograpycloud.publications.dto.Translator;
import com.biblograpycloud.publications.dto.errors.ErrorMessage;
import com.biblograpycloud.publications.dto.errors.ErrorMessages;
import com.biblograpycloud.publications.dto.errors.PublicationNotFoundErrorMessage;
import com.biblograpycloud.publications.managers.PublicationManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AttachmentController {
    private PublicationManager publicationManager;
    private Translator translator;

    @Autowired
    public AttachmentController(PublicationManager publicationManager, Translator translator) {
        this.publicationManager = publicationManager;
        this.translator = translator;
    }

    @GetMapping("/users/{user}/publications/{publicationId}/attachments")
    public ResponseEntity<?> getAllAttachments(@PathVariable String user, @PathVariable Long publicationId)
    {
        var maybePublication = publicationManager.getById(publicationId);
        if (maybePublication.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new PublicationNotFoundErrorMessage());

        var attachments = maybePublication.get().getAttachments();
        var attachmentsWithLinks = attachments.stream().
                map(a -> translator.createUserFileDTOWithHATEOAS(a, publicationId)).collect(Collectors.toList());

        return ResponseEntity.ok(attachmentsWithLinks);
    }

    @DeleteMapping("/users/{user}/publications/{publicationId}/attachments/{id}")
    public ResponseEntity<?> detach(@PathVariable String user, @PathVariable Long publicationId,
                                    @PathVariable Long id) {

        var maybePublication = publicationManager.getById(publicationId);
        if (maybePublication.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new PublicationNotFoundErrorMessage());

        var publication = maybePublication.get();
        var maybeAttachment = publication.getAttachments().stream()
                .filter(a -> a.getId().equals(id)).findFirst();
        if (maybeAttachment.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ErrorMessages.AttachmentNotFound());

        publication.getAttachments().remove(maybeAttachment.get());
        publicationManager.save(publication);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/users/{user}/publications/{publicationId}/attachments")
    ResponseEntity<?> attachFile(@PathVariable String user, @PathVariable Long publicationId,
                                 @RequestBody UserFile attachment) {
        var maybePublication = publicationManager.getById(publicationId);
        if (maybePublication.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new PublicationNotFoundErrorMessage());

        var publication = maybePublication.get();
        publication.getAttachments().add(attachment);
        publicationManager.save(publication);

        var link = linkTo(WebMvcLinkBuilder.methodOn(PublicationController.class)
                .getOnePublication(user, publicationId)).toUri();
        return ResponseEntity.created(link).build();
    }
}
