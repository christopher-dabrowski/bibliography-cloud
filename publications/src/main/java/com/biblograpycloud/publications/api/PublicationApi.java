package com.biblograpycloud.publications.api;

import com.biblograpycloud.publications.dao.entity.Publication;
import com.biblograpycloud.publications.dto.CreatePublicationDTO;
import com.biblograpycloud.publications.dto.Translator;
import com.biblograpycloud.publications.dto.errors.ErrorMessage;
import com.biblograpycloud.publications.dto.errors.PublicationAlreadyExistsMessage;
import com.biblograpycloud.publications.dto.errors.PublicationNotFoundErrorMessage;
import com.biblograpycloud.publications.exceptions.PublicationNotFoundException;
import com.biblograpycloud.publications.managers.PublicationManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.RepresentationModel;
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

    @GetMapping("/")
    public ResponseEntity<RepresentationModel> getPossibleActions() {
        var actionList = new RepresentationModel<>();

        var listPublications = new Link("/users/{user}/publications");
        var publicationDetails = new Link("/users/{user}/publications/{id}");
        var createPublication = new Link("/users/{user}/publications");
        var updatePublication = new Link("/users/{user}/publications/{id}");
        var deletePublication = new Link("/users/{user}/publications/{id}");

        actionList.add(listPublications, publicationDetails, createPublication, updatePublication, deletePublication);
        return  ResponseEntity.ok(actionList);
    }

    @GetMapping("/users/{user}/publications")
    public ResponseEntity<?> getAllUserPublication(@PathVariable String user) {
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
    public ResponseEntity<?> createPublication(@PathVariable String user,
                                               @Valid @RequestBody CreatePublicationDTO publicationDTO) {

        var publication = translator.CreatePublicationDTOTOPublication(publicationDTO);
        publication = publicationManager.save(publication);

        var link = linkTo(methodOn(this.getClass()).getOnePublication(user, publication.getId())).toUri();
        return ResponseEntity.created(link).build();
    }

    @PutMapping("/users/{user}/publications/{id}")
    public ResponseEntity<?> updatePublication(@PathVariable String user, @PathVariable long id,
                                               @RequestBody Publication publication) {
        if (id != publication.getId()) {
            return ResponseEntity.badRequest().body(new ErrorMessage("Id in path and object are different"));
        }

        try {
            var updated = publicationManager.update(publication);

            return ResponseEntity.ok(updated);
        } catch (PublicationNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new PublicationNotFoundErrorMessage());
        }
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
