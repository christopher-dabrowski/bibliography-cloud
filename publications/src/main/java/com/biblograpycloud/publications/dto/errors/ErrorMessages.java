package com.biblograpycloud.publications.dto.errors;

/**
 * Utility class for easy access to error messages
 */
public class ErrorMessages {

    public static ErrorMessage publicationNotFound() {
        return new PublicationNotFoundErrorMessage();
    }

    public static ErrorMessage publicationAlreadyExists() {
        return new PublicationAlreadyExistsMessage();
    }

    public static ErrorMessage AttachmentNotFound() {
        return new AttachmentNotFoundErrorMessage();
    }
}
