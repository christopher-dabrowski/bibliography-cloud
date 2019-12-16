package com.biblograpycloud.publications.api;

import com.biblograpycloud.publications.dao.entity.Publication;
import com.biblograpycloud.publications.dto.Translator;
import com.biblograpycloud.publications.managers.PublicationManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PublicationApi {

    private PublicationManager publicationManager;

    @Autowired
    public PublicationApi(PublicationManager publicationManager) {
        this.publicationManager = publicationManager;
    }

    @GetMapping("/users/{user}/publications/all")
    public ResponseEntity<?> getAllUserPublication(@PathVariable String user) {
//        var link = new Link("/place", "next");
        var link = linkTo(methodOn(PublicationApi.class).getAll()).withRel("me");
        System.out.println(link);

        var selfLink = link.andAffordance(afford(methodOn(PublicationApi.class).deletePublication(user, 1)));

        var publications = publicationManager.getAllUserPublications(user);
        var mapped = StreamSupport.stream(publications.spliterator(), false)
                .map(p -> Translator.createPublicationDTOWithHATEOAS(p))
                .collect(Collectors.toList());


        return ResponseEntity.ok(mapped);
//        return ResponseEntity.ok(new RepresentationModel<>(selfLink));


//        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/users/{user}/publications/{id}")
    public ResponseEntity<?> deletePublication(@PathVariable String user, @PathVariable int id) {
        // TODO: Make deleting work
        return ResponseEntity.ok(String.format("Publication number %d deleted", id));
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<Publication>> getAll() {

        var result = publicationManager.getAll();

        return ResponseEntity.ok(result);


//        var representationModel = new RepresentationModel();
//        representationModel.add(new Link("/publications", "publication.create"));
//        representationModel.add(new Link("/publications", "publication.delete"));
//
//        return ResponseEntity.ok().body(representationModel);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Publication> getById(@PathVariable long id) {
        var maybePublication = publicationManager.getById(id);

//        return maybePublication.ifPresentOrElse(p -> ResponseEntity.ok(p), () -> ResponseEntity.notFound().build());

        if (maybePublication.isPresent())
            return ResponseEntity.ok(maybePublication.get());
        else
            return ResponseEntity.notFound().build();
    }

//    @PostMapping
//    public ResponseEntity<Publication> addPublication(@RequestParam String owner,
//                                                      @RequestParam String title,
//                                                      @RequestParam Integer pageCount,
//                                                      @RequestParam Integer publicationYear) {
//
//        var publication = new Publication(owner, title, pageCount, publicationYear, new ArrayList<>(), new ArrayList<>());
//        var result = publicationManager.save(publication);
//
//        return ResponseEntity.ok(result);
////        return new ResponseEntity<Publication>(result, HttpStatus.OK);
//    }

    @PostMapping
    public ResponseEntity addPublication(@RequestBody Publication publication) {
        var result = publicationManager.save(publication);

        return ResponseEntity.ok(result);
    }
}
