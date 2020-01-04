package com.biblograpycloud.publications.api;

import com.biblograpycloud.publications.dto.Translator;
import com.biblograpycloud.publications.dto.errors.PublicationNotFoundErrorMessage;
import com.biblograpycloud.publications.managers.PublicationManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

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
    public ResponseEntity<?> getAllAttachments(@PathVariable String user, @PathVariable Integer publicationId)
    {
        var maybePublication = publicationManager.getById(publicationId);
        if (maybePublication.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new PublicationNotFoundErrorMessage());

        var attachments = maybePublication.get().getAttachments();
        var attachmentsWithLinks = attachments.stream().
                map(a -> translator.createUserFileDTOWithHATEOAS(a)).collect(Collectors.toList());

        return ResponseEntity.ok(attachmentsWithLinks);
    }
}
