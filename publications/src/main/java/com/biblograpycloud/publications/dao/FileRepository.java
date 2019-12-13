package com.biblograpycloud.publications.dao;

import com.biblograpycloud.publications.dao.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, Long> {
}
