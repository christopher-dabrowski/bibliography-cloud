package com.biblograpycloud.publications.api;

import com.biblograpycloud.publications.dao.entity.Publication;
import com.biblograpycloud.publications.managers.PublicationManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/publications")
public class PublicationApi {

    private PublicationManager publicationManager;

    @Autowired
    public PublicationApi(PublicationManager publicationManager) {
        this.publicationManager = publicationManager;
    }

    @GetMapping
    public ResponseEntity<Iterable<Publication>> getAll() {

        var result = publicationManager.getAll();

        return ResponseEntity.ok(result);


//        var representationModel = new RepresentationModel();
//        representationModel.add(new Link("/publications", "publication.create"));
//        representationModel.add(new Link("/publications", "publication.delete"));
//
//        return ResponseEntity.ok().body(representationModel);
    }

//    @PostMapping
//    public ResponseEntity<Publication> addPublication(@PathVariable String title,
//                                                      @PathVariable Integer pageCount,
//                                                      @PathVariable Integer publicationYear) {
//
//        var publication = new Publication()
//
//    }
}
