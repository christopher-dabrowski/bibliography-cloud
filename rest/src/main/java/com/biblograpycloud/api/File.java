package com.biblograpycloud.api;


import lombok.Getter;
import lombok.Setter;

public class File {
    @Getter
    @Setter
    private String name;

    public File() {

    }

    public File(String name) {
        this.name = name;
    }
}
