package com.biblograpycloud.api;

import com.biblograpycloud.api.repository.FileRepository;
import com.biblograpycloud.api.repository.FileRepositoryInMemory;
import com.biblograpycloud.api.repository.FileRepositoryRedis;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Enumeration;
import java.util.List;
import java.util.OptionalInt;

@RestController
@RequestMapping("/files")
public class FilesApi {
    private final FileRepository fileRepo;

    private final HttpServletRequest request;

    public FilesApi(@Autowired FileRepositoryInMemory fileRepo, @Autowired HttpServletRequest request) {
        this.fileRepo = fileRepo;
        this.request = request;
    }

    @PostConstruct
    public void init() throws IOException {
//        var directroy = new File(getClass().getClassLoader().getResource("static").getPath());
//
//        System.out.println(directroy.isDirectory());
//
//        String serverPath = request.getServletContext().getRealPath("/");
//
//        System.out.println(serverPath);
//
//        for (var file : directroy.listFiles()) {
//            Files.copy(file.toPath(), new File(serverPath).toPath());
//            System.out.println(file.getAbsolutePath());
//        }
//
//        System.out.println(files.nextElement().getPath());
    }


    @GetMapping
    public ResponseEntity<List<UserFile>> getAll(@RequestParam String user,
                                                 @RequestParam(defaultValue = "0") Integer skip,
                                                 @RequestParam(required = false) Integer limit) {

        System.out.println("getAll");
        System.out.println(user);
        System.out.println(skip);
        System.out.println(limit);

        System.out.println(request.getServletContext().getRealPath("/"));

        OptionalInt optionalLimit = limit != null ? OptionalInt.of(limit) : OptionalInt.empty();

        val files = fileRepo.getUserFiles(user, skip, optionalLimit);
        var response = new ResponseEntity<List<UserFile>>(files, HttpStatus.OK);

        return  response;
    }

    @PostMapping
    public ResponseEntity<UserFile> uploadFile(@RequestParam String user,
                                               @RequestParam("file") MultipartFile file) {

        System.out.println(user);
        System.out.println(file);

//        String filePath = request.getServletContext().getRealPath("/");
        var basePath = Paths.get("").toAbsolutePath().toString();
        var filePath = Paths.get(basePath, file.getOriginalFilename()).toString();
        try {
            file.transferTo(new File(filePath));
        } catch (IOException e) {
            return new ResponseEntity(HttpStatus.INSUFFICIENT_STORAGE);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
