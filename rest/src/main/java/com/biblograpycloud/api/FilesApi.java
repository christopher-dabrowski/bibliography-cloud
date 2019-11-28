package com.biblograpycloud.api;

import com.biblograpycloud.api.repository.FileRepository;
import com.biblograpycloud.api.repository.FileRepositoryRedis;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.OptionalInt;

@RestController
@RequestMapping("/files")
public class FilesApi {
    private final FileRepository fileRepo;

    private final HttpServletRequest request;

    public FilesApi(@Autowired FileRepositoryRedis fileRepo, @Autowired HttpServletRequest request) {
        this.fileRepo = fileRepo;
        this.request = request;
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

    @GetMapping("/{fileName}")
    public HttpEntity<byte[]> downloadFile(@RequestParam String user, @PathVariable("fileName") String fileName) {
        byte[] file;
        try {
            file = fileRepo.getActualFile(user, fileName);
        } catch (IOException e) {
            return new HttpEntity(HttpStatus.BAD_REQUEST);
        }

        var header = new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_PDF);
        header.set(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=" + fileName.replace(" ", "_"));
        header.setContentLength(file.length);

        return new HttpEntity<byte[]>(file, header);
    }

    @PostMapping
    public ResponseEntity<UserFile> uploadFile(@RequestParam String user,
                                               @RequestParam("file") MultipartFile file) {
        try {
            fileRepo.addUserFile(user, file);
        } catch (IOException e) {
            return new ResponseEntity(HttpStatus.INSUFFICIENT_STORAGE);
        }


        return new ResponseEntity<>(HttpStatus.OK);
    }
}
