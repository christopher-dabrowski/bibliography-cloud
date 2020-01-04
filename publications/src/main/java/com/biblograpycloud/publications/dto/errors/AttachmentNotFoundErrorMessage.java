package com.biblograpycloud.publications.dto.errors;

import lombok.NonNull;

public class AttachmentNotFoundErrorMessage extends ErrorMessage {
    public AttachmentNotFoundErrorMessage() {
        super("Attachment with given id doesn't exist");
    }

    public AttachmentNotFoundErrorMessage(@NonNull String message) {
        super(message);
    }
}
