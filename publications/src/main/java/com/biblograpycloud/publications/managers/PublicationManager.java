package com.biblograpycloud.publications.managers;

import com.biblograpycloud.publications.dao.PublicationRepo;
import com.biblograpycloud.publications.dao.entity.Publication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

@Service
public class PublicationManager {

    private PublicationRepo publicationRepo;

    @Autowired
    public PublicationManager(PublicationRepo publicationRepo) {
        this.publicationRepo = publicationRepo;
    }

    public Publication save(Publication publication) {
        return publicationRepo.save(publication);
    }

    public Iterable<Publication> getAll() {
        return publicationRepo.findAll();
    }

    @EventListener(ApplicationReadyEvent.class)
    public void createInitialRecords() {
        save(new Publication("Drugie prawo Kopernika", 220, 1526));
        save(new Publication("Pomiary - czlyli jak uwalić 50%", 170, 2000));
    }
}
