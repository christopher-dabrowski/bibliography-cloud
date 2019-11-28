package com.biblograpycloud.api.repository;

import com.biblograpycloud.api.UserFile;
import lombok.NonNull;
import lombok.val;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;
import redis.clients.jedis.Jedis;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Class for storing user files
 */
@Repository
public class FileRepositoryRedis implements FileRepository {

    private final RedisTemplate<String, String> redisTemplate;
    private final ListOperations<String, String> listOperations;
    private final SetOperations<String, String> setOperations;

    private Jedis jedis;

    private final String STORAGE_DIRECTORY = "Storage";

    public FileRepositoryRedis(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
        this.listOperations = this.redisTemplate.opsForList();
        this.setOperations = this.redisTemplate.opsForSet();

        this.jedis = new Jedis();

        fillWithInitialData();
    }

    private void fillWithInitialData() {

        var user = "jan";
        redisTemplate.delete(user);
        var files = Arrays.asList(
                new UserFile(user, "Praca naukowa.pdf"),
                new UserFile(user, "Odbicia światła.pdf"),
                new UserFile(user, "Ciekawe dowody.pdf")
        );

        listOperations.rightPushAll(user, files.stream().map(f -> f.getName()).collect(Collectors.toList()));
        System.out.println(listOperations.size(user));

        List<String> tmp = listOperations.range(user, 0, -1);
        tmp.forEach(n -> System.out.println(n));

        user = "Atrox";
        redisTemplate.delete(user);
        files = Arrays.asList(
                new UserFile(user, "Zupy świata.pdf")
//                new UserFile(user, "Kompzycje przypraw.pdf"),
//                new UserFile(user, "Najlepsze desery.pdf"),
//                new UserFile(user, "Sztuka marynowania.pdf")
        );

        listOperations.rightPushAll(user, files.stream().map(f -> f.getName()).collect(Collectors.toList()));
        System.out.println(listOperations.size(user));

        tmp = listOperations.range(user, 0, -1);
        tmp.forEach(n -> System.out.println(n));
    }

    public List<UserFile> getUserFiles(@NonNull String userName) {
        return getUserFiles(userName, 0, OptionalInt.empty());
    }

    public List<UserFile> getUserFiles(@NonNull String userName, int skip) {
        return getUserFiles(userName, skip, OptionalInt.empty());
    }

    public List<UserFile> getUserFiles(@NonNull String userName, int skip, OptionalInt limit) {
        if (!redisTemplate.hasKey(userName)) {
            return new ArrayList<>();
        }

        var end = limit.isPresent() ? skip + limit.getAsInt() : -1;
        var fileNames = listOperations.range(userName, skip, end);

        var result = new ArrayList<UserFile>(fileNames.size());
        for (var name : fileNames) {
            result.add(new UserFile(userName, name));
        }

        return result;
    }

    public void addUserFile(@NonNull String userName, @NonNull MultipartFile file) throws IOException {
        listOperations.rightPush(userName, file.getOriginalFilename());
        saveFile(userName, file);
    }

    @Override
    public void deleteUserFile(@NonNull String userName, @NonNull String fileName) {
        listOperations.remove(userName, 0, fileName);
        deleteFile(userName, fileName);
    }

    @Override
    public byte[] getActualFile(String userName, String fileName) throws IOException {
        var basePath = Paths.get(STORAGE_DIRECTORY).toAbsolutePath().toString();
        var filePath = Paths.get(basePath, userName, fileName).toString();
        var file = new File(filePath);

        if (!file.exists())
            throw new IllegalArgumentException("Cannot access file");
        return Files.readAllBytes(file.toPath());
    }

    private void saveFile(@NonNull String userName, @NonNull MultipartFile file) throws IOException {
        var basePath = Paths.get(STORAGE_DIRECTORY).toAbsolutePath().toString();
        var filePath = Paths.get(basePath, userName,file.getOriginalFilename()).toString();
        file.transferTo(new File(filePath));
    }

    private void deleteFile(@NonNull String userName, @NonNull String fileName) {
        var basePath = Paths.get(STORAGE_DIRECTORY).toAbsolutePath().toString();
        var filePath = Paths.get(basePath, userName, fileName).toString();

        new File(filePath).delete();
    }
}