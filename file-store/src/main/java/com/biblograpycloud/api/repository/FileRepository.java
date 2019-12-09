package com.biblograpycloud.api.repository;

import com.biblograpycloud.api.models.UserFile;
import lombok.NonNull;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.OptionalInt;

public interface FileRepository {

    List<UserFile> getUserFiles(@NonNull String userName);

    List<UserFile> getUserFiles(@NonNull String userName, int skip);

    List<UserFile> getUserFiles(@NonNull String userName, int skip, OptionalInt limit);

    void addUserFile(@NonNull String userName, @NonNull MultipartFile file) throws IOException;

    void deleteUserFile(@NonNull String userName, @NonNull String fileName) throws FileNotFoundException;

    byte[] getActualFile(String userName, String fileName) throws IOException;
}
