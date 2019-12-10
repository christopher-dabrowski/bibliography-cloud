package com.biblograpycloud.publications.dao;

import com.biblograpycloud.publications.dao.entity.Publication;
import org.springframework.data.repository.CrudRepository;

public interface PublicationRepo extends CrudRepository<Publication, Long> {
    public Iterable<Publication> findAllByPageCountBetween(int a, int b);
}
