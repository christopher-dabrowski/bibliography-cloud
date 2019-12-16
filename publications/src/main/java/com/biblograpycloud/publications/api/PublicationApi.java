package com.biblograpycloud.publications.api;

import com.biblograpycloud.publications.dto.CreatePublicationDTO;
import com.biblograpycloud.publications.dto.Translator;
import com.biblograpycloud.publications.dto.errors.PublicationAlreadyExistsMessage;
import com.biblograpycloud.publications.dto.errors.PublicationNotFoundErrorMessage;
import com.biblograpycloud.publications.managers.PublicationManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PublicationApi {

    private PublicationManager publicationManager;

    private Translator translator;

    @Autowired
    public PublicationApi(PublicationManager publicationManager, Translator translator) {
        this.publicationManager = publicationManager;
        this.translator = translator;
    }

    @GetMapping("/users/{user}/publications/all")
    public ResponseEntity<?> getAllUserPublication(@PathVariable String user) {
        // TODO: Cleanup link tests
//        var link = new Link("/place", "next");
//        var link = linkTo(methodOn(PublicationApi.class).getAllUserPublication(user)).withRel("me");
//        System.out.println(link);

//        Link selfLink = link.andAffordance(afford(methodOn(PublicationApi.class).deletePublication(user, 1)));

        var publications = publicationManager.getAllUserPublications(user);
        var mapped = StreamSupport.stream(publications.spliterator(), false)
                .map(p -> translator.createPublicationDTOWithHATEOAS(p, user))
                .collect(Collectors.toList());


        return ResponseEntity.ok(mapped);
    }

    @GetMapping("/users/{user}/publications/{id}")
    public ResponseEntity<?> getOnePublication(@PathVariable String user, @PathVariable long id) {
        var publication = publicationManager.getById(id);

        if (publication.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new PublicationAlreadyExistsMessage());
        }

        var result = translator.createPublicationDTOWithHATEOAS(publication.get(), user);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/users/{user}/publications")
    public ResponseEntity<?> createPublication(@PathVariable String user, @Valid @RequestBody CreatePublicationDTO publicationDTO) {

        var publication = translator.CreatePublicationDTOTOPublication(publicationDTO);
        publication = publicationManager.save(publication);

        var link = linkTo(methodOn(this.getClass()).getOnePublication(user, publication.getId())).toUri();
        return ResponseEntity.created(link).build();
    }

    @DeleteMapping("/users/{user}/publications/{id}")
    public ResponseEntity<?> deletePublication(@PathVariable String user, @PathVariable long id) {
        var publication = publicationManager.getById(id);

        if (publication.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new PublicationNotFoundErrorMessage());
        }

        publicationManager.delete(publication.get());
        return ResponseEntity.noContent().build();
    }
}
