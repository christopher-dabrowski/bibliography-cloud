package com.biblograpycloud.api;

import lombok.val;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/files")
public class FilesApi {

    public FilesApi() {

    }

    @GetMapping
    public List<File> getAll(@RequestParam String user) {
        val result = new ArrayList<File>();
        result.add(new File("dane.pdf"));
        result.add(new File("prace.pdf"));

        return result;
    }
}
