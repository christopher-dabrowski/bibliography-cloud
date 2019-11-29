package com.biblograpycloud.api;

import com.biblograpycloud.api.repository.FileRepository;
import com.biblograpycloud.api.repository.FileRepositoryDirectory;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.OptionalInt;

@RestController
@RequestMapping("/files")
public class FilesApi {
    private final FileRepository fileRepo;

    private final HttpServletRequest request;

    public FilesApi(@Autowired FileRepositoryDirectory fileRepo, @Autowired HttpServletRequest request) {
        this.fileRepo = fileRepo;
        this.request = request;
    }

    @GetMapping
    public ResponseEntity<List<UserFile>> getAll(@RequestParam String user,
                                                 @RequestParam(defaultValue = "0") Integer skip,
                                                 @RequestParam(required = false) Integer limit) {

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
        } catch (IllegalArgumentException e) {
            return new HttpEntity(HttpStatus.BAD_REQUEST);
        } catch (IOException e) {
            return new HttpEntity(HttpStatus.INTERNAL_SERVER_ERROR);
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

    @DeleteMapping
    public ResponseEntity deleteFile(@RequestParam String user,
                                     @RequestParam("file") String file) {
        try {
            fileRepo.deleteUserFile(user, file);
        } catch (FileNotFoundException e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity(HttpStatus.OK);
    }
}
