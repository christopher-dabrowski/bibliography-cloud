package com.biblograpycloud.publications.api;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/publications")
public class PublicationApi {

    @GetMapping
    public ResponseEntity<RepresentationModel> getAll() {
        var representationModel = new RepresentationModel();
        representationModel.add(new Link("/publications", "publication.create"));
        representationModel.add(new Link("/publications", "publication.delete"));

        return ResponseEntity.ok().body(representationModel);
    }
}
