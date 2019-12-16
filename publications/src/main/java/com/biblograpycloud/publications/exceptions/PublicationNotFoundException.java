package com.biblograpycloud.publications.exceptions;

public class PublicationNotFoundException extends RuntimeException {
    public PublicationNotFoundException() {
        super("Publication with given id does not exist");
    }

    public PublicationNotFoundException(String message) {
        super(message);
    }
}
