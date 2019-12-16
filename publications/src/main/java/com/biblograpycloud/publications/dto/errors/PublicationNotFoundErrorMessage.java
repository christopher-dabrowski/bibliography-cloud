package com.biblograpycloud.publications.dto.errors;

import lombok.NonNull;

public class PublicationNotFoundErrorMessage extends ErrorMessage {

    public PublicationNotFoundErrorMessage() {
        super("Publication with provided id desn't exist");
    }

    public PublicationNotFoundErrorMessage(@NonNull String message) {
        super(message);
    }
}
