package com.biblograpycloud.api;

import com.biblograpycloud.api.models.FileDTO;
import com.biblograpycloud.api.models.UserFile;
import com.biblograpycloud.api.repository.FileRepository;
import com.biblograpycloud.api.repository.FileRepositoryDirectory;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.security.Key;
import java.util.List;
import java.util.OptionalInt;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/files")
public class FilesApi {
    private final FileRepository fileRepo;

    private final HttpServletRequest request;

    @Value("${jwt.secret}")
    String JWT_SECRET;

    public FilesApi(@Autowired FileRepositoryDirectory fileRepo, @Autowired HttpServletRequest request) {
        this.fileRepo = fileRepo;
        this.request = request;
    }

    @GetMapping
    public ResponseEntity<List<FileDTO>> getAll(@RequestParam String user,
                                                 @RequestParam(defaultValue = "0") Integer skip,
                                                 @RequestParam(required = false) Integer limit,
                                                @RequestParam String token) {

        try {
            System.out.println(JWT_SECRET);
            System.out.println(JWT_SECRET.getBytes().length);
            Key key = new SecretKeySpec(JWT_SECRET.getBytes(), "HmacSHA256");
            var reuslt = Jwts.parser().setSigningKey(key).parseClaimsJws(token);
            System.out.println("Dobry token");
            //OK, we can trust this JWT

        } catch (JwtException e) {
            System.out.println("Zły token");
            //don't trust the JWT!
        }

        OptionalInt optionalLimit = limit != null ? OptionalInt.of(limit) : OptionalInt.empty();
        val files = fileRepo.getUserFiles(user, skip, optionalLimit);
        val filesDTO = files.stream().map(f -> new FileDTO(f.getName())).collect(Collectors.toList());
        var response = new ResponseEntity<List<FileDTO>>(filesDTO, HttpStatus.OK);

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
