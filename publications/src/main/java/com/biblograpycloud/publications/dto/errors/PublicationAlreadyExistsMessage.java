package com.biblograpycloud.publications.dto.errors;

import lombok.NonNull;

public class PublicationAlreadyExistsMessage extends ErrorMessage {

    public PublicationAlreadyExistsMessage() {
        super("Publication with provided title already exists");
    }

    public PublicationAlreadyExistsMessage(@NonNull String message) {
        super(message);
    }
}
