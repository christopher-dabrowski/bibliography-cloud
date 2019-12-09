package com.biblograpycloud.api.models;


import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

public class UserFile {
    @Getter
    @Setter
    private String name;

    @Getter
    @Setter
    private String user;

    public UserFile() {
        this.name = "";
        this.user = "";
    }

    public UserFile(@NonNull String user, @NonNull String name) {
        this.user = user;
        this.name = name;
    }
}
