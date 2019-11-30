package com.biblograpycloud.api.repository;

import com.biblograpycloud.api.models.UserFile;
import lombok.NonNull;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.OptionalInt;
import java.util.stream.Collectors;

@Repository
public class FileRepositoryDirectory implements FileRepository {
    private final String STORAGE_DIRECTORY = "Storage";

    @Override
    public List<UserFile> getUserFiles(@NonNull String userName) {
        return getUserFiles(userName, 0);
    }

    @Override
    public List<UserFile> getUserFiles(@NonNull String userName, int skip) {
        return getUserFiles(userName, skip, OptionalInt.empty());
    }

    @Override
    public List<UserFile> getUserFiles(@NonNull String userName, int skip, OptionalInt limit) {
        var userDirectory = Paths.get(STORAGE_DIRECTORY, userName).toFile();
        if (!userDirectory.exists())
            return new ArrayList<>();

        List<String> fileNames = Arrays.stream(userDirectory.listFiles()).skip(skip).limit(limit.orElse(Integer.MAX_VALUE)).map(f -> f.getName()).collect(Collectors.toList());
        var result = new ArrayList<UserFile>();
        for (var fileName : fileNames) {
            result.add(new UserFile(userName, fileName));
        }

        return result;
    }

    @Override
    public void addUserFile(@NonNull String userName, @NonNull MultipartFile file) throws IOException {
        saveFile(userName, file);
    }

    @Override
    public void deleteUserFile(@NonNull String userName, @NonNull String fileName) throws FileNotFoundException {
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
        var userDirectoryPath = Paths.get(basePath, userName);
        if (!userDirectoryPath.toFile().exists())
            userDirectoryPath.toFile().mkdirs();

        var filePath = Paths.get(userDirectoryPath.toString(), file.getOriginalFilename());
        file.transferTo(filePath.toFile());
    }

    private void deleteFile(@NonNull String userName, @NonNull String fileName) throws FileNotFoundException {
        var basePath = Paths.get(STORAGE_DIRECTORY).toAbsolutePath().toString();
        var filePath = Paths.get(basePath, userName, fileName);

        if (!filePath.toFile().exists())
            throw new FileNotFoundException("File wasn't there");

        filePath.toFile().delete();
    }
}
