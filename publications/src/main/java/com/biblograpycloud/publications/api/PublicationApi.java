package com.biblograpycloud.publications.api;

import com.biblograpycloud.publications.dao.entity.Publication;
import com.biblograpycloud.publications.managers.PublicationManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PublicationApi {

    private PublicationManager publicationManager;

    @Autowired
    public PublicationApi(PublicationManager publicationManager) {
        this.publicationManager = publicationManager;
    }

    @GetMapping("/users/{user}/publications/all")
    public ResponseEntity<Iterable<Publication>> getAllUserPublication(@PathVariable String user) {
        var result = publicationManager.getAllUserPublications(user);

        return ResponseEntity.ok(result);
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
